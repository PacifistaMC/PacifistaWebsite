import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'input-file',
    imports: [
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        NgClass
    ],
    templateUrl: './input-file.component.html',
    styleUrl: './input-file.component.scss'
})
export class InputFileComponent {

  @Input() label: string = 'Fichier';
  @Input() id: string = 'file';
  @Input() required: boolean = true;
  @Input() formSent: boolean = false;
  @Input() inputErrors: string[] = [];

  @Input() file?: File;
  @Output() fileChange = new EventEmitter<File | undefined>();

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.fileChange.emit(target.files[0]);
    } else {
      this.fileChange.emit(undefined);
    }
  }

}
