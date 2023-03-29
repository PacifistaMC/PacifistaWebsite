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
  url: string = environment.funixApiUrl + 'user/auth/';

  constructor(protected httpClient: HttpClient) {
    super();
  }

  register(request: UserCreationDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(this.url + 'register', request, {headers: this.getHeaders()});
  }

  login(request: UserLoginDTO): Observable<UserTokenDTO> {
    return this.httpClient.post<UserTokenDTO>(this.url + 'login', request, {headers: this.getHeaders()});
  }

  currentUser(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.url + 'current', {headers: this.getHeaders()});
  }
}
