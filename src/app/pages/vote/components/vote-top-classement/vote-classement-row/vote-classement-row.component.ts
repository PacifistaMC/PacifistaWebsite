import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-vote-classement-row',
  templateUrl: './vote-classement-row.component.html',
  styleUrl: './vote-classement-row.component.scss'
})
export class VoteClassementRowComponent {

  @Input() position: number = 1;
  @Input() username: string = 'Username';
  @Input() votes: number = 1;

  getMoneyGain(): number | undefined {
    if (this.position >= 1 && this.position <= 10) {
      if (this.position === 1) {
        return 15000;
      } else if (this.position === 2) {
        return 10000;
      } else if (this.position === 3) {
        return 7500;
      } else if (this.position === 4) {
        return 5000;
      } else if (this.position === 5) {
        return 4000;
      } else if (this.position === 6) {
        return 3000;
      } else if (this.position === 7) {
        return 2000;
      } else if (this.position === 8) {
        return 1500;
      } else if (this.position === 9) {
        return 1000;
      } else if (this.position === 10) {
        return 500;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

}
