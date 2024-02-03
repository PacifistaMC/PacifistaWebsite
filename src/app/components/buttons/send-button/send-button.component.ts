import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-send-button',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './send-button.component.html',
  styleUrl: './send-button.component.scss'
})
export class SendButtonComponent {
  @Input() label: string = 'Envoyer';
  @Input() labelLoading: string = 'Chargement...';
  @Input() loading: boolean = false;
  @Input() classBtn: string = 'btn-primary'
  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit();
  }
}
