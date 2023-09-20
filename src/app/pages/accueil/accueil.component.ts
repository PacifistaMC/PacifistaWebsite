import {Component, Renderer2} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent extends PacifistaPage {

  constructor(title: Title,
              renderer: Renderer2) {
    super(title, renderer);
  }

}
