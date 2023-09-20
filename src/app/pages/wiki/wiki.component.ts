import {Component, Inject} from '@angular/core';
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent extends PacifistaPage {

  protected override readonly title: string = "Wiki";
  protected override readonly canonicalPath: string = "wiki";
  protected override readonly pageDescription: string = "Wiki de Pacifista. Retrouvez toutes les informations sur le serveur minecraft et comment jouer ! Claims, Créatif, Métiers, Jobs et bien plus !";

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

}
