import {UserDTO} from "../dtos/UserDTO";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import FunixProdHttpClient from "../../../core/services/FunixProdHttpClient";
import UserCreationDTO from "../dtos/UserCreationDTO";
import UserLoginDTO from "../dtos/UserLoginDTO";
import UserTokenDTO from "../dtos/UserTokenDTO";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class UserService extends FunixProdHttpClient {
  private readonly captchaHeaderCode = 'X-Captcha-Google-Code';

  url: string = environment.funixApiUrl + 'user/auth/';

  constructor(protected httpClient: HttpClient) {
    super();
  }

  register(request: UserCreationDTO, captchaCode: string): Observable<UserDTO> {
    let headers = this.getHeaders();
    headers = headers.set(this.captchaHeaderCode, captchaCode);

    return this.httpClient.post<UserDTO>(this.url + 'register', request, {headers: headers});
  }

  login(request: UserLoginDTO, captchaCode: string): Observable<UserTokenDTO> {
    let headers = this.getHeaders();
    headers = headers.set(this.captchaHeaderCode, captchaCode);

    return this.httpClient.post<UserTokenDTO>(this.url + 'login', request, {headers: headers});
  }

  currentUser(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.url + 'current', {headers: this.getHeaders()});
  }
}
