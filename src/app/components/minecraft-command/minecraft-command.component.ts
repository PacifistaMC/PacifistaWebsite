import {Component, Input} from '@angular/core';
import NotificationService from "../../services/notifications/services/NotificationService";

@Component({
    selector: 'minecraft-command',
    imports: [],
    templateUrl: './minecraft-command.component.html',
    styleUrl: './minecraft-command.component.scss'
})
export class MinecraftCommandComponent {

  @Input() command: string = ''

  constructor(private notificationService: NotificationService) {
  }

  copyCommand() {
    navigator.clipboard.writeText(this.command).then(r =>
        this.notificationService.info('Commande copiée dans le presse-papier.'));
  }
}
