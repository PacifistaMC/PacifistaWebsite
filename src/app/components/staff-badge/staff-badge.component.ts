import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'staff-badge',
  templateUrl: './staff-badge.component.html',
  styleUrl: './staff-badge.component.scss'
})
export class StaffBadgeComponent implements OnInit {

  @Input() username: string = '';

  classRole: string = 'badge ';
  roleName: string = '';

  ngOnInit(): void {
    if (StaffBadgeComponent.owner === this.username.toLowerCase()) {
      this.classRole += 'fondateur';
      this.roleName = 'Fondateur';
    } else if (StaffBadgeComponent.admins.includes(this.username.toLowerCase())) {
      this.classRole += 'admin';
      this.roleName = 'Admin';
    } else if (StaffBadgeComponent.moderators.includes(this.username.toLowerCase())) {
      this.classRole += 'moderator';
      this.roleName = 'Modérateur';
    } else if (StaffBadgeComponent.helpers.includes(this.username.toLowerCase())) {
      this.classRole += 'helper';
      this.roleName = 'Helpeur';
    } else if (StaffBadgeComponent.developers.includes(this.username.toLowerCase())) {
      this.classRole += 'developer';
      this.roleName = 'Développeur';
    } else if (StaffBadgeComponent.animators.includes(this.username.toLowerCase())) {
      this.classRole += 'animator';
      this.roleName = 'Animateur';
    } else if (StaffBadgeComponent.artists.includes(this.username.toLowerCase())) {
      this.classRole += 'artist';
      this.roleName = 'Graphisme';
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
    'whisky_',
    'havca_'
  ];

  public static readonly helpers: string[] = [

  ];

  public static readonly developers: string[] = [
    'gamecreep35',
    'scaffus',
  ];

  public static readonly animators: string[] = [
  ];

  public static readonly artists: string[] = [
    'lucipopo'
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
