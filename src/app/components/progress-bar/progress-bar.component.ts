import {Component, Input} from '@angular/core';

@Component({
  selector: 'progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @Input() progress: number = 0;
  @Input() bgClass: string = '';
  @Input() label: string = 'Chargement';

}
