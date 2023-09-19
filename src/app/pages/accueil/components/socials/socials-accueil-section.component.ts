import {Component} from '@angular/core';
import {faExternalLink} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'socials-section',
  templateUrl: './socials-accueil-section.component.html',
  styleUrls: ['./socials-accueil-section.component.scss']
})
export class SocialsAccueilSectionComponent {
  protected readonly logoExternalLink = faExternalLink;
  protected readonly size = 'sm';
}
