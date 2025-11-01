import { Component } from '@angular/core';
import {WorldDlService} from "../world-dl.service";

@Component({
  selector: 'app-world-dl-component',
  standalone: false,
  templateUrl: './world-dl.component.html',
  styleUrl: './world-dl.component.scss'
})
export class WorldDlComponent {

  constructor(protected readonly dlService: WorldDlService) {

  }

}
