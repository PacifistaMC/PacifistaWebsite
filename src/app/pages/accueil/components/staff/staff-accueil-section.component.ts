import {Component} from '@angular/core';
import {StaffBadgeComponent} from "../../../../components/staff-badge/staff-badge.component";

@Component({
    selector: 'staff-section',
    templateUrl: './staff-accueil-section.component.html',
    styleUrls: ['./staff-accueil-section.component.scss']
})
export class StaffAccueilSectionComponent {

    readonly owner: string = StaffBadgeComponent.owner;

    readonly admins: string[] = StaffBadgeComponent.admins;

    readonly moderators: string[] = StaffBadgeComponent.moderators;

    readonly helpers: string[] = StaffBadgeComponent.helpers;

    readonly developers: string[] = StaffBadgeComponent.developers;

    readonly animators: string[] = StaffBadgeComponent.animators;

}
