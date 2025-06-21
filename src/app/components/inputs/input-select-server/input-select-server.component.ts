import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PacifistaServerType} from "@funixproductions/funixproductions-requests";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-select-server',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './input-select-server.component.html',
  styleUrl: './input-select-server.component.scss'
})
export class InputSelectServerComponent {

  readonly serversTypes: PacifistaServerType[] = Object.values(PacifistaServerType);

  @Input() selectedServer?: PacifistaServerType
  @Input() idInput: string = 'server-selector';
  @Input() label: string = 'Serveur';
  @Output() onServerSelected = new EventEmitter<PacifistaServerType>();

  onSeverSelected(): void {
    this.onServerSelected.emit(this.selectedServer);
  }

}
