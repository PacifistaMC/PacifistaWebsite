import {Component} from '@angular/core';

@Component({
    selector: 'staff-section',
    templateUrl: './staff-accueil-section.component.html',
    styleUrls: ['./staff-accueil-section.component.scss'],
    standalone: false
})
export class StaffAccueilSectionComponent {

  readonly moderators: string[] = [

  ];

  readonly helpers: string[] = [
      'NuageOisif',
      'Pascal0Bistrot',
      'DioMay',
      'Havca_',
      'No_Littleby',
  ];

  readonly developers: string[] = [
      'GameCreep35'
  ];

  readonly animators: string[] = [
      'Whisky_'
  ];

}
