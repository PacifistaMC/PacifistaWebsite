import {Component} from '@angular/core';
import NotificationService from "../../services/notifications/services/NotificationService";
import {NotificationType} from "../../services/notifications/enums/NotificationType";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faCheckCircle, faExclamationTriangle, faInfoCircle} from "@fortawesome/free-solid-svg-icons";

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
      case NotificationType.STANDARD:
        return 'bg-info';
      case NotificationType.SUCCESS:
        return 'bg-success';
    }
  }

  getIconFromType(type: NotificationType): IconDefinition {
    switch (type) {
      case NotificationType.DANGER:
        return faExclamationTriangle;
      case NotificationType.STANDARD:
        return faInfoCircle;
      case NotificationType.SUCCESS:
        return faCheckCircle;
    }
  }

}
