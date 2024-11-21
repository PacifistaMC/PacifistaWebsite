import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-send-button',
    imports: [
        NgIf,
        NgbModule
    ],
    templateUrl: './send-button.component.html',
    styleUrl: './send-button.component.scss'
})
export class SendButtonComponent {
  @Input() label: string = 'Envoyer';
  @Input() labelLoading: string = 'Chargement...';
  @Input() loading: boolean = false;
  @Input() classBtn: string = 'btn-primary';
  @Input() labelIcon: string = '';
  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit();
  }
}
