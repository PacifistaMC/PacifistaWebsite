import {CrudHttpClient} from "@funixproductions/funixproductions-requests";
import ClaimDto from "../dtos/claim.dto";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import WorldDlLogsService from "../../world-dl-logs/world-dl-logs.service";
import McaService from "../../services/mca.service";

@Injectable()
export default class ClaimService extends CrudHttpClient<ClaimDto> {

    constructor(httpClient: HttpClient,
                private readonly logService: WorldDlLogsService,
                private readonly mcaService: McaService) {
        super(
            httpClient,
            environment.pacifistaApiDomain,
            'claim/claim-data'
        )
    }

}
