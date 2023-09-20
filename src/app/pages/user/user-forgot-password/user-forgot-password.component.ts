import {Component, Renderer2} from '@angular/core';
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.scss']
})
export class UserForgotPasswordComponent extends PacifistaPage {

  protected override title: string = 'Mot de passe oublié';
  protected override canonicalPath: string = 'user/forgotpassword';
  protected override pageDescription: string = 'Page de récupération de mot de passe.';

  email: string = '';

  constructor(title: Title,
              renderer: Renderer2) {
    super(title, renderer);
  }

  sendRequestReset() {

  }

}
