import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss'
})
export class InputCheckboxComponent {
  @Input() label: string = 'Text';
  @Input() id: string = 'validationCheckbox';
  @Input() checked: boolean = false;
  @Input() required: boolean = true;
  @Input() formSent: boolean = false;
  @Input() checkboxErrors: string[] = [];
  @Output() onChange = new EventEmitter<boolean>();

  onInput(event: any) {
    this.onChange.emit(event.target.checked);
  }
}
