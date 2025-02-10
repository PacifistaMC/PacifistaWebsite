import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'staff-badge',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './staff-badge.component.html',
  styleUrl: './staff-badge.component.scss'
})
export class StaffBadgeComponent implements OnInit {

  @Input() username: string = '';
  @Input() marginRight: boolean = false;

  classRole: string = '';
  roleName: string = '';

  ngOnInit(): void {
    if (StaffBadgeComponent.owner === this.username.toLowerCase()) {
      this.classRole = 'fondateur';
      this.roleName = 'Fondateur';
    } else if (StaffBadgeComponent.admins.includes(this.username.toLowerCase())) {
      this.classRole = 'admin';
      this.roleName = 'Admin';
    } else if (StaffBadgeComponent.moderators.includes(this.username.toLowerCase())) {
      this.classRole = 'moderator';
      this.roleName = 'Modérateur';
    } else if (StaffBadgeComponent.helpers.includes(this.username.toLowerCase())) {
      this.classRole = 'helper';
      this.roleName = 'Helpeur';
    } else if (StaffBadgeComponent.developers.includes(this.username.toLowerCase())) {
      this.classRole = 'developer';
      this.roleName = 'Développeur';
    } else if (StaffBadgeComponent.animators.includes(this.username.toLowerCase())) {
      this.classRole = 'animator';
      this.roleName = 'Animateur';
    } else {
    }

    if (this.marginRight && this.classRole.length > 0) {
      this.classRole += ' margin-right';
    }
  }

  public static readonly owner: string = 'funixgaming';

  public static readonly admins: string[] = [
  ];

  public static readonly moderators: string[] = [
    'knyzeeer',
    'nuageoisif',
    'pascal0bistrot',
    'diomay',
    'havca_',
    'no_littleby',
  ];

  public static readonly helpers: string[] = [

  ];

  public static readonly developers: string[] = [
    'gamecreep35'
  ];

  public static readonly animators: string[] = [
    'whisky_'
  ];

  public static isStaff(username: string): boolean {
    let data = username.toLowerCase();

    return StaffBadgeComponent.admins.includes(data)
        || StaffBadgeComponent.moderators.includes(data)
        || StaffBadgeComponent.helpers.includes(data)
        || StaffBadgeComponent.developers.includes(data)
        || StaffBadgeComponent.animators.includes(data)
        || StaffBadgeComponent.owner === data;
  }

}
