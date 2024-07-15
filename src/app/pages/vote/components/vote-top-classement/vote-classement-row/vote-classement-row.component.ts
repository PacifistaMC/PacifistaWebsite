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

}
