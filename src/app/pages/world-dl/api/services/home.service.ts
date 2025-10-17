import {CrudHttpClient} from "@funixproductions/funixproductions-requests";
import HomeDto from "../dtos/home.dto";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import WorldDlLogsService from "../../world-dl-logs/world-dl-logs.service";
import McaService from "../../services/mca.service";

@Injectable()
export default class HomeService extends CrudHttpClient<HomeDto> {

    constructor(httpClient: HttpClient,
                private readonly logService: WorldDlLogsService,
                private readonly mcaService: McaService) {
        super(
            httpClient,
            environment.pacifistaApiDomain,
            'essentials/home'
        )
    }

}
