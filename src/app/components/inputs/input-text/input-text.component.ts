import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-input-text',
    imports: [
        NgForOf,
        FormsModule,
        NgClass,
        NgIf
    ],
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() label: string = 'Text';
  @Input() placeholder: string = 'Hint';
  @Input() id: string = 'validationText';
  @Input() text: string = '';
  @Input() required: boolean = true;
  @Input() formSent: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputErrors: string[] = [];
  @Output() textChange = new EventEmitter<string>();

  onInput() {
    this.textChange.emit(this.text);
  }
}
