import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-staff-accueuil-section-row-player',
    templateUrl: './staff-accueuil-section-row-player.component.html',
    styleUrl: './staff-accueuil-section-row-player.component.scss',
    standalone: false
})
export class StaffAccueuilSectionRowPlayerComponent {

  @Input() username: string = '';

}
