import {Component, EventEmitter, Input, Output} from '@angular/core';
import NotificationService from "../../../services/notifications/services/NotificationService";
import {InputFileComponent} from "../../../components/inputs/input-file/input-file.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-admin-image-form',
  imports: [
    InputFileComponent,
    NgOptimizedImage
  ],
  templateUrl: './admin-image-form.component.html',
  styleUrl: './admin-image-form.component.scss'
})
export class AdminImageFormComponent {

  @Input() imageUrl?: string;
  @Input() formSent: boolean = false;
  @Output() imageChange = new EventEmitter<File>();

  protected imageFile?: File;
  protected imagePreview?: string | ArrayBuffer | null;

  constructor(private readonly notificationService: NotificationService) {
  }

  setFile(file?: File) {
    if (file) {
      if (file.type.split('/')[0] !== 'image') {
        this.notificationService.error('Le fichier que vous avez ajouté n\'est pas une image.');
        this.imagePreview = undefined;
        this.imageFile = undefined;
      } else {
        this.imageFile = file;
        this.imageChange.emit(this.imageFile);

        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.imageFile = undefined;
      this.imagePreview = undefined;
    }
  }

}
