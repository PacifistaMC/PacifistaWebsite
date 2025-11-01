import {Injectable} from "@angular/core";
import {PacifistaPlayerDataDTO} from "@funixproductions/funixproductions-requests";
import HomeService from "./api/services/home.service";
import ClaimService from "./api/services/claim.service";
import WorldDlLogsService from "./world-dl-logs/world-dl-logs.service";
import McaService, {RegionDownloadData} from "./services/mca.service";
import NotificationService from "../../services/notifications/services/NotificationService";
import JSZip from "jszip";
import { saveAs } from "file-saver";

@Injectable()
export class WorldDlService {

    selectedPlayers: PacifistaPlayerDataDTO[] = []
    totalUrlsToDownload: number = 0
    downloadedUrls: number = 0
    percentDownloaded: number = 0
    startedDownload: boolean = false
    loadingZip: boolean = false
    loadingAddPlayer: boolean = false

    private readonly zip: JSZip = new JSZip()

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

        this.startedDownload = true
        this.logService.log("Démarrage du téléchargement des données pour " + this.selectedPlayers.length + " joueurs...")

        const alphaFiles = this.mcaService.alphaMcaFiles()
        alphaFiles.forEach(file => {
            this.totalUrlsToDownload += file.entityFileDownloadUrls.length + file.regionFileDownloadUrls.length
        })

        const betaFiles = this.mcaService.betaMcaFiles()
        betaFiles.forEach(file => {
            this.totalUrlsToDownload += file.entityFileDownloadUrls.length + file.regionFileDownloadUrls.length
        })

        this.logService.log("Total des fichiers à télécharger: " + this.totalUrlsToDownload)
        this.logService.log("Préparation des archives ZIP et lancement des téléchargements...")
        this.notificationService.info("Lancement du téléchargement. Ne quittez pas la page.")

        if (alphaFiles.length > 0) {
            alphaFiles.forEach(file => {
                file.regionFileDownloadUrls.forEach(fileUrl => {
                    this.downloadFile(fileUrl, this.zip)
                })
                file.entityFileDownloadUrls.forEach(fileUrl => {
                    this.downloadFile(fileUrl, this.zip)
                })
            })
        }

        if (betaFiles.length > 0) {
            betaFiles.forEach(file => {
                file.regionFileDownloadUrls.forEach(fileUrl => {
                    this.downloadFile(fileUrl, this.zip)
                })
                file.entityFileDownloadUrls.forEach(fileUrl => {
                    this.downloadFile(fileUrl, this.zip)
                })
            })
        }
    }

    private downloadFile(dlData: RegionDownloadData, zip: JSZip) {
        this.logService.log("Téléchargement du fichier: " + dlData.savePath)

        const xhr = new XMLHttpRequest();
        xhr.open("GET", dlData.fileUrl, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = () => {
            if (xhr.status === 200) {
                zip.file(dlData.savePath, xhr.response);
            }
            this.downloadedUrls += 1
            this.percentDownloaded = Math.floor((this.downloadedUrls / this.totalUrlsToDownload) * 100)

            if (this.downloadedUrls >= this.totalUrlsToDownload) {
                this.sendZip()
            }
        }
        xhr.onerror = () => {
            this.downloadedUrls += 1
            this.percentDownloaded = Math.floor((this.downloadedUrls / this.totalUrlsToDownload) * 100)

            if (this.downloadedUrls >= this.totalUrlsToDownload) {
                this.sendZip()
            }
        }
        xhr.send();
    }

    private sendZip() {
        this.logService.log("Tous les fichiers du serveur ont été téléchargés. Préparation du fichier ZIP pour le téléchargement...")
        this.notificationService.info("Préparation du fichier ZIP pour le téléchargement du serveur...")

        this.loadingZip = true
        this.zip.generateAsync({type:"blob"})
            .then((content) => {
                saveAs(content, "pacifista-worlds.zip");
                this.loadingZip = false
                this.logService.log("Fichier ZIP prêt et téléchargement lancé.")
                this.notificationService.info("Le fichier ZIP a été préparé et le téléchargement a été lancé.")
            });
    }


}
