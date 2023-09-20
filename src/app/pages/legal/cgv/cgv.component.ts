import {Component, Renderer2} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";

@Component({
  selector: 'app-cgv',
  templateUrl: './cgv.component.html',
  styleUrls: ['./cgv.component.scss']
})
export class CgvComponent extends PacifistaPage {

  protected override readonly title: string = 'CGV';
  protected override readonly canonicalPath: string = 'cgv';
  protected override readonly pageDescription: string = 'Conditions générales de vente de Pacifista.';

  constructor(title: Title,
              renderer: Renderer2) {
    super(title, renderer);
  }

}
