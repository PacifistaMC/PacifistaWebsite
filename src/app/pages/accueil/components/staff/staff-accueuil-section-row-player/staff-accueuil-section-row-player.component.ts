import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-staff-accueuil-section-row-player',
  templateUrl: './staff-accueuil-section-row-player.component.html',
  styleUrl: './staff-accueuil-section-row-player.component.scss'
})
export class StaffAccueuilSectionRowPlayerComponent {

  @Input() username: string = '';
  @Input() classRole: string = '';
  @Input() roleName: string = '';

}
