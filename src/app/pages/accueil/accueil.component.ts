import {Component, Inject, DOCUMENT} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";


@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss'],
    standalone: false
})
export class AccueilComponent extends PacifistaPage {

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

}
