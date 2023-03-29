import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent {

  constructor(private titleService: Title) {
    const title: string = titleService.getTitle();

    if (!title.startsWith("CGU")) {
      titleService.setTitle('CGU - ' + title);
    }
  }

}
