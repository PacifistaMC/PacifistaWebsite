import {
    CrudHttpClient,
    PacifistaPlayerDataDTO,
    PageOption,
    QueryBuilder, QueryParam
} from "@funixproductions/funixproductions-requests";
import HomeDto from "../dtos/home.dto";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import WorldDlLogsService from "../../world-dl-logs/world-dl-logs.service";
import McaService from "../../services/mca.service";
import {ResumeCoordinatesFilesService} from "../../services/resume-coordinates-files.service";

@Injectable()
export default class HomeService extends CrudHttpClient<HomeDto> {

    constructor(httpClient: HttpClient,
                private readonly logService: WorldDlLogsService,
                private readonly mcaService: McaService,
                private readonly resumeService: ResumeCoordinatesFilesService) {
        super(
            httpClient,
            'https://api.pacifista.fr/',
            'essentials/home'
        )
    }

    public getPlayerHomes(player: PacifistaPlayerDataDTO, doneCallback?: () => void) {
        const pageOption = new PageOption()
        pageOption.elemsPerPage = 300
        pageOption.page = 0

        const queryBuilder = new QueryBuilder()
        const param = new QueryParam()
        param.key = 'playerUuid'
        param.value = player.minecraftUuid
        param.type = QueryBuilder.equal
        queryBuilder.addParam(param)

        this.logService.log("Récupération des homes pour " + player.minecraftUsername + " (" + player.minecraftUuid + ")...")
        super.find(pageOption, queryBuilder).subscribe({
            next: (homes) => {
                if (homes.content.length === 0) {
                    this.logService.log("Aucun home trouvé pour " + player.minecraftUsername + " (" + player.minecraftUuid + ").")
                } else {
                    this.logService.log("Récupération des homes pour " + player.minecraftUsername + " (" + player.minecraftUuid + "): " + homes.content.length + " homes trouvés.")

                    homes.content.forEach((home) => {
                        this.resumeService.addHome(player, home)
                        this.mcaService.addFromCoordinates(
                            home.x,
                            home.z,
                            home.worldUuid,
                            home.serverType
                        )
                    })
                }
                doneCallback?.()
            },
            error: (err) => {
                this.logService.logError(`Erreur lors de la récupération des homes pour ${player.minecraftUsername} (${player.minecraftUuid}): ${err.message}`)
                doneCallback?.()
            }
        })
    }

}
