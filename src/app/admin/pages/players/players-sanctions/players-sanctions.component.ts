import {Component} from '@angular/core';
import {PaginatedComponent} from "../../../../components/paginated/paginated.component";
import {
  PacifistaPlayerDataDTO,
  PacifistaSanctionDTO,
  PacifistaSanctionService,
  QueryBuilder,
  QueryParam
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-players-sanctions',
    templateUrl: './players-sanctions.component.html',
    styleUrl: './players-sanctions.component.scss',
    standalone: false
})
export class PlayersSanctionsComponent extends PaginatedComponent<PacifistaSanctionDTO, PacifistaSanctionService> {

  protected playerData: PacifistaPlayerDataDTO[] = [];

  constructor(httpClient: HttpClient, notificationService: NotificationService) {
    super(new PacifistaSanctionService(httpClient, environment.production), httpClient, notificationService);
  }

  protected override updateList() {
    super.updateList(() => {
      const idsList: string[] = []

      this.list.forEach((sanction) => {
        idsList.push(sanction.playerSanctionUuid);

        if (sanction.playerActionUuid) {
          idsList.push(sanction.playerActionUuid);
        }
      })

      super.fetchPlayerDataFromList(idsList, (data) => this.playerData = data);
    });
  }

  getUsernameFromId(id: string): string | undefined {
    const data = this.playerData.find((data) => data.minecraftUuid === id);
    return data ? data.minecraftUsername : undefined;
  }

  searchByUserName(username: QueryParam, staffSearch: boolean = false) {
    const usernameGet: string | string[] = username.value ?? '';

    if (typeof usernameGet === 'string') {
      if (usernameGet.length === 0) {
        const query = new QueryParam();
        query.type = QueryBuilder.equal;
        if (staffSearch) {
          query.key = 'playerActionUuid';
        } else {
          query.key = 'playerSanctionUuid';
        }
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
        if (staffSearch) {
          query.key = 'playerActionUuid';
        } else {
          query.key = 'playerSanctionUuid';
        }

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
