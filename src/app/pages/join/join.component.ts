import {Component, Inject, DOCUMENT} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";


@Component({
    selector: 'app-join',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss'],
    standalone: false
})
export class JoinComponent extends PacifistaPage {

  protected override readonly title: string = 'Se connecter'
  protected override readonly canonicalPath: string = 'join'
  protected override readonly pageDescription: string = 'Découvrez comment rejoindre Pacifista en 1.21 : votre guide pour jouer sur notre serveur Minecraft survie, créatif français !';

  constructor(title: Title,
      @Inject(DOCUMENT) doc: Document) {
    super(title,  doc);
  }

}
