import {Injectable} from "@angular/core";
import {PacifistaPlayerDataDTO, PacifistaServerType} from "@funixproductions/funixproductions-requests";
import HomeService from "./api/services/home.service";
import ClaimService from "./api/services/claim.service";
import WorldDlLogsService from "./world-dl-logs/world-dl-logs.service";
import NotificationService from "../../services/notifications/services/NotificationService";

@Injectable()
export class WorldDlService {

    selectedPlayers: PacifistaPlayerDataDTO[] = []


    constructor(private readonly homeService: HomeService,
                private readonly claimService: ClaimService,
                private readonly logService: WorldDlLogsService,
                private readonly notificationService: NotificationService) {
    }

}
