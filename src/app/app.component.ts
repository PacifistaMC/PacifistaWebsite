import {Component, OnDestroy} from '@angular/core';
import NotificationService from "./services/notifications/services/NotificationService";
import {MatomoService} from "./services/matomo.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnDestroy {
  title = 'pacifista-website';

  constructor(private notificationService: NotificationService,
              private matomoService: MatomoService) {
  }

  ngOnDestroy(): void {
    this.notificationService.clear();
  }

}
