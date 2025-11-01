import {Injectable} from "@angular/core";
import {PacifistaPlayerDataDTO} from "@funixproductions/funixproductions-requests";
import HomeService from "./api/services/home.service";
import ClaimService from "./api/services/claim.service";
import WorldDlLogsService from "./world-dl-logs/world-dl-logs.service";
import McaService, {RegionDownloadData} from "./services/mca.service";
import NotificationService from "../../services/notifications/services/NotificationService";

@Injectable()
export class WorldDlService {

    selectedPlayers: PacifistaPlayerDataDTO[] = []
    totalUrlsToDownload: number = 0
    downloadedUrls: number = 0
    percentDownloaded: number = 0
    startedDownload: boolean = false
    loadingAddPlayer: boolean = false

    private dirHandle?: FileSystemDirectoryHandle

    constructor(private readonly homeService: HomeService,
                private readonly claimService: ClaimService,
                private readonly mcaService: McaService,
                private readonly logService: WorldDlLogsService,
                private readonly notificationService: NotificationService) {
    }

    async addPlayer(player: PacifistaPlayerDataDTO) {
        if (this.loadingAddPlayer) return

        if (this.selectedPlayers.some(p => p.minecraftUuid === player.minecraftUuid)) {
            this.logService.log("Le joueur " + player.minecraftUsername + " (" + player.minecraftUuid + ") est déjà dans la liste.")
        } else {
            this.selectedPlayers.push(player)
            this.logService.log("Joueur ajouté: " + player.minecraftUsername + " (" + player.minecraftUuid + ")")

            if (this.selectedPlayers.length > 5) {
                this.notificationService.warning("Si vous ajoutez plus de 5 joueurs, le téléchargement peut prendre beaucoup de temps et générer de gros fichiers ZIP et vous demander beaucoup de RAM et d'espace disque.")
            }

            this.loadingAddPlayer = true
            this.homeService.getPlayerHomes(player, () => {
                this.claimService.getClaimsForPlayer(player, () => {
                    this.loadingAddPlayer = false
                })
            })
        }
    }

    async startDownload() {
        if (this.loadingAddPlayer || this.startedDownload) return

        if (this.selectedPlayers.length === 0) {
            this.notificationService.error("Veuillez ajouter au moins un joueur avant de lancer le téléchargement.")
            return
        }

        const w = globalThis as any
        if (!w || typeof w.showDirectoryPicker !== 'function') {
            this.notificationService.info("Votre navigateur ne supporte pas l'écriture directe dans un dossier. Veuillez utiliser Google Chrome sur PC/Mac.")
            return
        }

        try {
            this.dirHandle = await w.showDirectoryPicker({ mode: 'readwrite' })
        } catch {
            this.notificationService.warning("Sélection du dossier annulée.")
            return
        }

        if (this.dirHandle && (this.dirHandle as any).requestPermission) {
            const perm = await (this.dirHandle as any).requestPermission({ mode: 'readwrite' })
            if (perm !== 'granted') {
                this.notificationService.warning("Permission d’écriture refusée.")
                return
            }
        }

        this.startedDownload = true
        this.logService.log("Démarrage du téléchargement des données pour " + this.selectedPlayers.length + " joueurs...")

        const alphaFiles = this.mcaService.alphaMcaFiles()
        for (const file of alphaFiles) {
            this.totalUrlsToDownload += file.entityFileDownloadUrls.length + file.regionFileDownloadUrls.length
        }

        const betaFiles = this.mcaService.betaMcaFiles()
        for (const file of betaFiles) {
            this.totalUrlsToDownload += file.entityFileDownloadUrls.length + file.regionFileDownloadUrls.length
        }

        this.logService.log("Total des fichiers à télécharger: " + this.totalUrlsToDownload)
        this.logService.log("Préparation des archives ZIP et lancement des téléchargements...")
        this.notificationService.info("Lancement du téléchargement. Ne quittez pas la page.")

        if (alphaFiles.length > 0) {
            for (const file of alphaFiles) {
                for (const fileUrl of file.regionFileDownloadUrls) {
                    await this.downloadFile(fileUrl)
                }
                for (const fileUrl of file.entityFileDownloadUrls) {
                    await this.downloadFile(fileUrl)
                }
            }
        }

        if (betaFiles.length > 0) {
            for (const file of betaFiles) {
                for (const fileUrl of file.regionFileDownloadUrls) {
                    await this.downloadFile(fileUrl)
                }
                for (const fileUrl of file.entityFileDownloadUrls) {
                    await this.downloadFile(fileUrl)
                }
            }
        }
    }

    private async downloadFile(dlData: RegionDownloadData) {
        try {
            const resp = await fetch(dlData.fileUrl)

            if (resp.ok) {
                this.logService.log("Téléchargement du fichier: " + dlData.savePath)
                await this.writeBlobToDirectory(dlData.savePath, await resp.blob())
            }
        } catch (e: any) {
        } finally {
            this.downloadedUrls += 1
            this.percentDownloaded = Math.floor((this.downloadedUrls / this.totalUrlsToDownload) * 100)
        }
    }

    private async writeBlobToDirectory(savePath: string, blob: Blob): Promise<void> {
        try {
            if (!this.dirHandle) {
                this.logService.logError("Aucun dossier sélectionné.")
                return
            }
            const parts = savePath.split('/').filter(Boolean)
            const fileName = parts.pop() as string

            let currentDir = this.dirHandle
            for (const segment of parts) {
                currentDir = await currentDir.getDirectoryHandle(segment, {create: true})
            }

            const fileHandle = await currentDir.getFileHandle(fileName, {create: true})
            const writable = await fileHandle.createWritable()
            await writable.write(blob)
            await writable.close()
        } catch (error: any) {
            this.logService.logError("Erreur lors de l'écriture du fichier " + savePath + ": " + (error as Error).message)
        }
    }
}
