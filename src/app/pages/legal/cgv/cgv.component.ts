import {Component, Inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-cgv',
    templateUrl: './cgv.component.html',
    styleUrls: ['./cgv.component.scss'],
    standalone: false
})
export class CgvComponent extends PacifistaPage {

  protected override readonly title: string = 'CGV';
  protected override readonly canonicalPath: string = 'cgv';
  protected override readonly pageDescription: string = 'Conditions générales de vente de Pacifista.';

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

}
