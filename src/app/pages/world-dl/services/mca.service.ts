import {Injectable} from "@angular/core";
import {PacifistaServerType} from "@funixproductions/funixproductions-requests";

@Injectable()
export default class McaService {

    private static readonly SURVIE_ALPHA_OVERWORLD_UUID: string = 'e9778abe-6b52-4e89-a4de-6a4a91787b51'
    private static readonly SURVIE_ALPHA_NETHER_UUID: string = '552674b6-2d80-465f-9e99-4b3e37816aba'
    private static readonly SURVIE_ALPHA_END_UUID: string = 'f199915b-1a38-430e-9f6e-1ace532106d0'

    private static readonly SURVIE_BETA_OVERWORLD_UUID: string = '5a1d8b31-77a4-483b-88bc-b8adc1b2249d'
    private static readonly SURVIE_BETA_NETHER_UUID: string = 'bf6878fd-adb2-4fc1-ad51-6bef3121102d'
    private static readonly SURVIE_BETA_END_UUID: string = '35703aba-f85b-4ea4-a3c8-6092a54adb42'

    private readonly mcaFiles: RegionFileMcaData[] = []

    public addFromCoordinates(x: number, z: number, worldUuid: string, serverType: PacifistaServerType) {
        let worldType: WorldType
        let regionX = Math.floor(x / 512)
        let regionZ = Math.floor(z / 512)

        if (serverType == PacifistaServerType.SURVIE_ALPHA) {
            if (worldUuid == McaService.SURVIE_ALPHA_OVERWORLD_UUID) {
                worldType = WorldType.OVERWORLD
            } else if (worldUuid == McaService.SURVIE_ALPHA_NETHER_UUID) {
                worldType = WorldType.NETHER
            } else if (worldUuid == McaService.SURVIE_ALPHA_END_UUID) {
                worldType = WorldType.END
            } else {
                return
            }
        } else if (serverType == PacifistaServerType.SURVIE_BETA) {
            if (worldUuid == McaService.SURVIE_BETA_OVERWORLD_UUID) {
                worldType = WorldType.OVERWORLD
            } else if (worldUuid == McaService.SURVIE_BETA_NETHER_UUID) {
                worldType = WorldType.NETHER
            } else if (worldUuid == McaService.SURVIE_BETA_END_UUID) {
                worldType = WorldType.END
            } else {
                return
            }
        }

        const newMcaData = new RegionFileMcaData(regionX, regionZ, worldType!, serverType)
        if (!this.mcaFiles.some(mcaData => mcaData.equals(newMcaData))) {
            this.mcaFiles.push(newMcaData)
        }
    }

    public alphaMcaFiles(): RegionFileMcaData[] {
        return this.mcaFiles.filter(mcaData => mcaData.serverAlpha)
    }

    public betaMcaFiles(): RegionFileMcaData[] {
        return this.mcaFiles.filter(mcaData => !mcaData.serverAlpha)
    }

}

export class RegionFileMcaData {
    x: number
    z: number
    worldType: WorldType
    serverAlpha: boolean

    regionFileDownloadUrls: RegionDownloadData[]
    entityFileDownloadUrls: RegionDownloadData[]

    folderRegionPath: string
    folderEntitiesPath: string

    constructor(x: number, z: number, worldType: WorldType, serverType: PacifistaServerType) {
        this.x = x
        this.z = z
        this.worldType = worldType
        this.serverAlpha = serverType == PacifistaServerType.SURVIE_ALPHA

        switch (worldType) {
            case WorldType.OVERWORLD:
                this.folderRegionPath = 'region'
                this.folderEntitiesPath = 'entities'
                break
            case WorldType.NETHER:
                this.folderRegionPath = 'DIM-1/region'
                this.folderEntitiesPath = 'DIM-1/entities'
                break
            case WorldType.END:
                this.folderRegionPath = 'DIM1/region'
                this.folderEntitiesPath = 'DIM1/entities'
                break
        }

        const basePath = this.getDownloadUrlBasePath()
        this.regionFileDownloadUrls = [
            new RegionDownloadData(`${basePath}/region/r.${x}.${z}.mca`, this.folderRegionPath, `r.${x}.${z}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x - 1}.${z}.mca`, this.folderRegionPath, `r.${x - 1}.${z}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x + 1}.${z}.mca`, this.folderRegionPath, `r.${x + 1}.${z}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x}.${z - 1}.mca`, this.folderRegionPath, `r.${x}.${z - 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x}.${z + 1}.mca`, this.folderRegionPath, `r.${x}.${z + 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x - 1}.${z - 1}.mca`, this.folderRegionPath, `r.${x - 1}.${z - 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x + 1}.${z + 1}.mca`, this.folderRegionPath, `r.${x + 1}.${z + 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x - 1}.${z + 1}.mca`, this.folderRegionPath, `r.${x - 1}.${z + 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/region/r.${x + 1}.${z - 1}.mca`, this.folderRegionPath, `r.${x + 1}.${z - 1}.mca`, this.serverAlpha)
        ]

        this.entityFileDownloadUrls = [
            new RegionDownloadData(`${basePath}/entities/r.${x}.${z}.mca`, this.folderEntitiesPath, `r.${x}.${z}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x - 1}.${z}.mca`, this.folderEntitiesPath, `r.${x - 1}.${z}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x + 1}.${z}.mca`, this.folderEntitiesPath, `r.${x + 1}.${z}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x}.${z - 1}.mca`, this.folderEntitiesPath, `r.${x}.${z - 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x}.${z + 1}.mca`, this.folderEntitiesPath, `r.${x}.${z + 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x - 1}.${z - 1}.mca`, this.folderEntitiesPath, `r.${x - 1}.${z - 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x + 1}.${z + 1}.mca`, this.folderEntitiesPath, `r.${x + 1}.${z + 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x - 1}.${z + 1}.mca`, this.folderEntitiesPath, `r.${x - 1}.${z + 1}.mca`, this.serverAlpha),
            new RegionDownloadData(`${basePath}/entities/r.${x + 1}.${z - 1}.mca`, this.folderEntitiesPath, `r.${x + 1}.${z - 1}.mca`, this.serverAlpha)
        ]
    }

    public equals(other: RegionFileMcaData): boolean {
        if (this.worldType == other.worldType && this.serverAlpha == other.serverAlpha) {
            return (this.x == other.x && this.z == other.z) ||
                (this.x == other.x - 1 && this.z == other.z) ||
                (this.x == other.x + 1 && this.z == other.z) ||
                (this.x == other.x && this.z == other.z - 1) ||
                (this.x == other.x && this.z == other.z + 1) ||
                (this.x == other.x - 1 && this.z == other.z - 1) ||
                (this.x == other.x + 1 && this.z == other.z + 1) ||
                (this.x == other.x - 1 && this.z == other.z + 1) ||
                (this.x == other.x + 1 && this.z == other.z - 1)
        } else {
            return false
        }
    }

    private getDownloadUrlBasePath(): string {
        let url = this.serverAlpha ? 'https://dl-survie-alpha.pacifista.fr/' : 'https://dl-survie-beta.pacifista.fr/'

        switch (this.worldType) {
            case WorldType.OVERWORLD:
                url += this.serverAlpha ? 'survie' : 'world'
                break
            case WorldType.NETHER:
                url += this.serverAlpha ? 'survie_nether' : 'world_nether'
                break
            case WorldType.END:
                url += this.serverAlpha ? 'survie_the_end' : 'world_the_end'
                break
        }

        return url
    }
}

export class RegionDownloadData {
    fileUrl: string
    savePath: string
    fileName: string

    constructor(fileUrl: string, savePath: string, fileName: string, serverAlpha: boolean) {
        this.fileUrl = fileUrl
        this.fileName = fileName
        this.savePath = (serverAlpha ? 'survieAlpha' : 'survieBeta' ) + '/' + savePath + '/' + fileName
    }
}

export enum WorldType {
    NETHER,
    END,
    OVERWORLD
}