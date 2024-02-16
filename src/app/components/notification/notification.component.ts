import {Component} from '@angular/core';
import NotificationService from "../../services/notifications/services/NotificationService";
import {NotificationType} from "../../services/notifications/enums/NotificationType";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  constructor(public notificationService: NotificationService) {
  }

  getClassFromType(type: NotificationType): string {
    switch (type) {
      case NotificationType.DANGER:
        return 'bg-danger';
      case NotificationType.WARNING:
        return 'bg-warning';
      case NotificationType.STANDARD:
        return 'bg-info';
      case NotificationType.SUCCESS:
        return 'bg-success';
    }
  }

  getIconFromType(type: NotificationType): string {
    switch (type) {
      case NotificationType.DANGER:
      case NotificationType.WARNING:
        return "bi bi-exclamation-triangle-fill";
      case NotificationType.STANDARD:
        return "bi bi-info-circle-fill";
      case NotificationType.SUCCESS:
        return "bi bi-check-circle-fill";
    }
  }

}
