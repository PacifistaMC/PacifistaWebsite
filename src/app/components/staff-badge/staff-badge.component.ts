import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'staff-badge',
  standalone: true,
  imports: [],
  templateUrl: './staff-badge.component.html',
  styleUrl: './staff-badge.component.scss'
})
export class StaffBadgeComponent implements OnInit {

  @Input() username: string = '';

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
  }

  public static readonly owner: string = 'funixgaming';

  public static readonly admins: string[] = [
    'knyzeeer',
    'jarkodj',
    'tomyshelby'
  ];

  public static readonly moderators: string[] = [
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

}
