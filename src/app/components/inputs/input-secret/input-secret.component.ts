import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-input-secret',
    imports: [
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        NgClass
    ],
    templateUrl: './input-secret.component.html',
    styleUrl: './input-secret.component.scss'
})
export class InputSecretComponent {
    @Input() label: string = 'Text';
    @Input() placeholder: string = 'Hint';
    @Input() id: string = 'validationSecret';
    @Input() text: string = '';
    @Input() required: boolean = true;
    @Input() formSent: boolean = false;
    @Input() inputErrors: string[] = [];
    @Output() textChange = new EventEmitter<string>();

    onInput() {
        this.textChange.emit(this.text);
    }
}
