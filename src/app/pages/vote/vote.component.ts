import {Component, Renderer2} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent extends PacifistaPage {

  protected override readonly title: string = "Voter";
  protected override readonly canonicalPath: string = "vote";
  protected override readonly pageDescription: string = "Votez pour Pacifista et recevez des récompenses en jeu. Aidez-nous à faire connaître le serveur !";

  constructor(title: Title,
              renderer: Renderer2) {
    super(title, renderer);
  }

}
