import {Component, Inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-cgu',
    templateUrl: './cgu.component.html',
    styleUrls: ['./cgu.component.scss'],
    standalone: false
})
export class CguComponent extends PacifistaPage {

  protected override readonly title: string = "CGU";
  protected override readonly canonicalPath: string = "cgu";
  protected override readonly pageDescription: string = "Conditions générales d'utilisation de Pacifista.";

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

}
