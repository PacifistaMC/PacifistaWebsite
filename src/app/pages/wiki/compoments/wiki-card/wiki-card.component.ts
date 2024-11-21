import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-wiki-card',
    templateUrl: './wiki-card.component.html',
    styleUrls: ['./wiki-card.component.scss'],
    standalone: false
})
export class WikiCardComponent {

  @Input() title: string = 'Wiki';
  @Input() description: string = 'Un wiki';
  @Input() pathUrl: string = '/help';

}
