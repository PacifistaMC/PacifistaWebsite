import {Injectable} from "@angular/core";
import NotificationToast from "../entities/NotificationToast";
import {NotificationType} from "../enums/NotificationType";
import {ErrorDto} from "@funixproductions/funixproductions-requests";

@Injectable({ providedIn: 'root' })
export default class NotificationService {
  toasts: NotificationToast[] = [];

  show(toast: NotificationToast) {
    this.toasts.push(toast);
  }

  info(message: string, header: string = 'Information') {
    this.show(new NotificationToast(header, message, 7000, NotificationType.STANDARD));
  }

  error(message: string, header: string = 'Erreur') {
    this.show(new NotificationToast(header, message, 7000, NotificationType.DANGER));
  }

  warning(message: string, header: string = 'Attention') {
    this.show(new NotificationToast(header, message, 7000, NotificationType.WARNING));
  }

  remove(toast: NotificationToast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  public onErrorRequest(err: ErrorDto): void {
    if (err.status === 401) {
      this.error('Vous devez être connecté pour accéder à cette ressource. (Erreur 401)');
    } else if (err.status === 403) {
      this.error('Vous n\'avez pas les droits pour accéder à cette ressource. (Erreur 403)');
    } else if (err.status === 404) {
      this.error('La ressource demandée est introuvable. (Erreur 404)');
    } else if (err.status === 400) {
      this.error('Votre requête est invalide. (Erreur 400) ' + err.error);
    } else if (err.status.toString().startsWith('5')) {
      this.error('Une erreur interne est survenue veuillez réessayer ou nous prévenir à contact@funixproductions.com. (Erreur ' + err.status + ') ' + err.error);
    } else {
      this.error('Une erreur est survenue veuillez réessayer. (Erreur ' + err.status + ') ' + err.error);
    }
  }
}
