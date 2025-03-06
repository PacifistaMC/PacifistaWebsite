import {Component} from '@angular/core';
import {StaffBadgeComponent} from "../../../../components/staff-badge/staff-badge.component";

@Component({
    selector: 'staff-section',
    templateUrl: './staff-accueil-section.component.html',
    styleUrls: ['./staff-accueil-section.component.scss'],
    standalone: false
})
export class StaffAccueilSectionComponent {

    readonly owner: string = StaffBadgeComponent.owner;

    readonly admins: string[] = StaffBadgeComponent.admins;

    readonly moderators: string[] = StaffBadgeComponent.moderators;

    readonly helpers: string[] = StaffBadgeComponent.helpers;

    readonly otherStaffs: string[];

    constructor() {
        let otherStaffs: string[] = [];

        for (let staff of StaffBadgeComponent.developers) {
            otherStaffs.push(staff);
        }

        for (let staff of StaffBadgeComponent.animators) {
            otherStaffs.push(staff);
        }

        for (let staff of StaffBadgeComponent.artists) {
            otherStaffs.push(staff);
        }

        this.otherStaffs = otherStaffs;
    }

}
