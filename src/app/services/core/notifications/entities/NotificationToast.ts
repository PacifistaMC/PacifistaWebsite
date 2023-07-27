import {NotificationType} from "../enums/NotificationType";

export default class NotificationToast {
  header: string;
  body: string;
  delay: number = 7000;
  type: NotificationType = NotificationType.STANDARD;

  constructor(header: string, body: string, delay: number = 7000, type: NotificationType = NotificationType.STANDARD) {
    this.header = header;
    this.body = body;
    this.delay = delay;
    this.type = type;
  }
}
