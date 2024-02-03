import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgForOf
  ],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss'
})
export class InputEmailComponent {
  @Input() label: string = 'Adresse email';
  @Input() id: string = 'validationEmailAddress';
  @Input() email: string = '';
  @Input() formSent: boolean = false;
  @Input() emailErrors: string[] = [];
  @Input() isRequired: boolean = true;
  @Output() emailChange = new EventEmitter<string>();

  onInput() {
    this.emailChange.emit(this.email);
  }
}
