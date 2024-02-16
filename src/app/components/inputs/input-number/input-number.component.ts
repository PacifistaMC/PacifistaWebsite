import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss'
})
export class InputNumberComponent {
  @Input() label: string = 'Number';
  @Input() placeholder: string = 'Hint';
  @Input() id: string = 'validationNumber';
  @Input() number?: number;
  @Input() required: boolean = true;
  @Input() formSent: boolean = false;
  @Input() inputErrors: string[] = [];
  @Output() numberChange = new EventEmitter<number>();

  onInput() {
    this.numberChange.emit(this.number);
  }
}
