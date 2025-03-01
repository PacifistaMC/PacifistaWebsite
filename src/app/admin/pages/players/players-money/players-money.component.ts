import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../../components/paginated/paginated.component";
import {
    PacifistaPlayerDataDTO,
    PlayerMoneyDTO,
    PlayerMoneyService, QueryBuilder, QueryParam
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-players-money',
    templateUrl: './players-money.component.html',
    styleUrl: './players-money.component.scss',
    standalone: false
})
export class PlayersMoneyComponent extends PaginatedComponent<PlayerMoneyDTO, PlayerMoneyService> {

    protected playerData: PacifistaPlayerDataDTO[] = [];

    constructor(httpClient: HttpClient, notificationService: NotificationService) {
        super(new PlayerMoneyService(httpClient, environment.production), httpClient, notificationService);
    }

    protected override updateList() {
        super.updateList(() => {
            const idsList: string[] = [];

            this.list.forEach((money: PlayerMoneyDTO) => {
                idsList.push(money.playerOwnerUuid);
            });

            super.fetchPlayerDataFromList(idsList, (data) => this.playerData = data);
        }, "money:desc");
    }

    getUsernameFromId(id: string): string | undefined {
        const data = this.playerData.find((data) => data.minecraftUuid === id);
        return data ? data.minecraftUsername : undefined;
    }

    searchByUserName(username: QueryParam) {
        const usernameGet: string | string[] = username.value ?? '';

        if (typeof usernameGet === 'string') {
            if (usernameGet.length === 0) {
                const query = new QueryParam();
                query.type = QueryBuilder.equal;
                query.key = 'minecraftUuid';
                query.value = '';

                super.search(query);
                return;
            }

            super.findPlayerDataFromUsername(usernameGet, true, (data) => {
                let idsList: string[] = [];
                data.forEach((player) => {
                    idsList.push(player.minecraftUuid);
                });

                const query = new QueryParam();
                query.type = QueryBuilder.equal;
                query.key = 'minecraftUuid';

                if (idsList.length === 0) {
                    query.value = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
                    super.search(query);
                } else {
                    query.value = idsList;
                    super.search(query);
                }
            });
        }
    }
}
