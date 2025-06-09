import {Component, Inject, DOCUMENT} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PacifistaPage} from "../../components/pacifista-page/pacifista-page";

import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-vote-page',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.scss'],
    standalone: false
})
export class VoteComponent extends PacifistaPage {

  protected override readonly title: string = "Voter";
  protected override readonly canonicalPath: string = "vote";
  protected override readonly pageDescription: string = "Votez pour Pacifista et recevez des récompenses en jeu. Aidez-nous à faire connaître le serveur !";

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document,
              private route: ActivatedRoute) {
    super(title, doc);
  }


  protected override onPageInit() {
    this.route.fragment.subscribe(fragment => {
      const element = document.getElementById(fragment!);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

}
