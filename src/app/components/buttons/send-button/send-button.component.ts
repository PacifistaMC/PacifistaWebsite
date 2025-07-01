import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-send-button',
    imports: [
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
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit();
  }
}
