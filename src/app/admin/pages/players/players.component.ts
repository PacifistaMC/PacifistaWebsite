import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../components/paginated/paginated.component";
import {PacifistaPlayerDataDTO, PacifistaPlayerDataService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import NotificationService from "../../../services/notifications/services/NotificationService";

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrl: './players.component.scss',
    standalone: false
})
export class PlayersComponent extends PaginatedComponent<PacifistaPlayerDataDTO, PacifistaPlayerDataService> {

    constructor(httpClient: HttpClient, notificationService: NotificationService) {
        super(new PacifistaPlayerDataService(httpClient, environment.production), httpClient, notificationService);
    }

}
