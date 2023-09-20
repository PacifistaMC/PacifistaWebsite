import {Component, Renderer2} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent extends PacifistaPage {

  protected override readonly title: string = 'Se connecter'
  protected override readonly canonicalPath: string = 'join'
  protected override readonly pageDescription: string = 'Découvrez comment rejoindre Pacifista en 1.19 : votre guide pour jouer sur notre serveur Minecraft survie, créatif français !';

  constructor(title: Title,
              renderer: Renderer2) {
    super(title, renderer);
  }

}
