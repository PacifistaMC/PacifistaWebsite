import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-admin-create-item-btn-tab',
  imports: [],
  templateUrl: './admin-create-item-btn-tab.component.html',
  styleUrl: './admin-create-item-btn-tab.component.scss'
})
export class AdminCreateItemBtnTabComponent {

  @Input() label: string = 'Créer';
  @Input() icon: string = 'plus';
  @Input() path: string = '';
  @Input() classBtn: string = 'btn-success';

}
