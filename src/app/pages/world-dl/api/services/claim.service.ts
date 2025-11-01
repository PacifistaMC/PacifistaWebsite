import {
    CrudHttpClient,
    PacifistaPlayerDataDTO,
    PageOption,
    QueryBuilder, QueryParam
} from "@funixproductions/funixproductions-requests";
import ClaimDto from "../dtos/claim.dto";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import WorldDlLogsService from "../../world-dl-logs/world-dl-logs.service";
import McaService from "../../services/mca.service";
import {ResumeCoordinatesFilesService} from "../../services/resume-coordinates-files.service";

@Injectable()
export default class ClaimService extends CrudHttpClient<ClaimDto> {

    constructor(httpClient: HttpClient,
                private readonly logService: WorldDlLogsService,
                private readonly mcaService: McaService,
                private readonly resumeService: ResumeCoordinatesFilesService) {
        super(
            httpClient,
            'https://api.pacifista.fr/',
            'claim/claim-data'
        )
    }

    public getClaimsForPlayer(player: PacifistaPlayerDataDTO, doneCallback?: () => void) {
        const pageOption = new PageOption()
        pageOption.elemsPerPage = 300
        pageOption.page = 0

        const queryBuilder = new QueryBuilder()
        const queryparam = new QueryParam()
        queryparam.key = 'users.playerId'
        queryparam.value = player.minecraftUuid
        queryparam.type = QueryBuilder.equal
        queryBuilder.addParam(queryparam)

        this.logService.log("Récupération des claims pour " + player.minecraftUsername + " (" + player.minecraftUuid + ")...")
        super.find(pageOption, queryBuilder).subscribe({
            next: (claims) => {
                if (claims.content.length === 0) {
                    this.logService.log("Aucun claim trouvé pour " + player.minecraftUsername + " (" + player.minecraftUuid + ").")
                } else {
                    this.logService.log("Récupération des claims pour " + player.minecraftUsername + " (" + player.minecraftUuid + "): " + claims.content.length + " claims trouvés.")
                    claims.content.forEach((claim) => {
                        this.resumeService.addClaim(player, claim)
                        this.addClaim(claim)
                    })
                }
                doneCallback?.()
            },
            error: (err) => {
                this.logService.logError(`Erreur lors de la récupération des claims pour ${player.minecraftUsername} (${player.minecraftUuid}): ${err.message}`)
                doneCallback?.()
            }
        })
    }

    private addClaim(claimDto: ClaimDto) {
        let x = claimDto.lesserBoundaryCornerX
        let z = claimDto.lesserBoundaryCornerZ

        while (x <= claimDto.greaterBoundaryCornerX) {
            while (z <= claimDto.greaterBoundaryCornerZ) {
                this.mcaService.addFromCoordinates(
                    x,
                    z,
                    claimDto.worldId,
                    claimDto.serverType
                )
                z += 16
            }
            z = claimDto.lesserBoundaryCornerZ
            x += 16
        }
    }

}
