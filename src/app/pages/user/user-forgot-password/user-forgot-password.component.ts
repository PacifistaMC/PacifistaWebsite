import {Component, Inject} from '@angular/core';
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

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

  loading: boolean = false;
  formSent: boolean = false;

  emailErrors: string[] = [];

  constructor(title: Title,
              @Inject(DOCUMENT) doc: Document) {
    super(title, doc);
  }

  sendRequestReset() {

  }

}
