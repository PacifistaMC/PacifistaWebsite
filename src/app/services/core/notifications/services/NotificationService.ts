import {Injectable} from "@angular/core";
import NotificationToast from "../entities/NotificationToast";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationType} from "../enums/NotificationType";

@Injectable({ providedIn: 'root' })
export default class NotificationService {
  toasts: NotificationToast[] = [];

  show(toast: NotificationToast) {
    this.toasts.push(toast);
  }

  error(message: string, header: string = 'Erreur') {
    this.show(new NotificationToast(header, message, 7000, NotificationType.STANDARD));
  }

  remove(toast: NotificationToast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  public onErrorRequest(err: HttpErrorResponse, customMessage: string = ''): void {
    if (err.error && err.error.error) {
      this.error(customMessage + ' : ' + err.error.error + ' (Erreur code ' + err.status + ')');
    } else {
      if (err.status === 401) {
        this.error('Vous devez être connecté pour accéder à cette ressource. (Erreur 401)' + (customMessage.length > 0 ? 'Message: ' + customMessage : ''));
      } else if (err.status === 403) {
        this.error('Vous n\'avez pas les droits pour accéder à cette ressource. (Erreur 403)' + (customMessage.length > 0 ? 'Message: ' + customMessage : ''));
      } else if (err.status === 404) {
        this.error('La ressource demandée est introuvable. (Erreur 404)' + (customMessage.length > 0 ? 'Message: ' + customMessage : ''));
      } else if (err.status === 400) {
        this.error('Votre requête est invalide. (Erreur 400)' + (customMessage.length > 0 ? 'Message: ' + customMessage : ''));
      } else {
        this.error('Une erreur interne est survenue veuillez re essayer. (Erreur ' + err.status + ')' + (customMessage.length > 0 ? 'Message: ' + customMessage : ''));
      }
    }
  }
}
