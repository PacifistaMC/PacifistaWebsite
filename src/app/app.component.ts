import {Component, OnDestroy} from '@angular/core';
import NotificationService from "./services/notifications/services/NotificationService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'pacifista-website';

  constructor(private notificationService: NotificationService) {
  }

  ngOnDestroy(): void {
    this.notificationService.clear();
  }
}
