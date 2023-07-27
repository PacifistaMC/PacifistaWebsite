import {HttpHeaders} from "@angular/common/http";

export default abstract class FunixProdHttpClient {

  public static readonly LOCAL_STORAGE_KEY_AUTH = 'user-token-requests';

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const bearerToken: string | null = this.getBearer();
    if (bearerToken !== null) {
      headers = headers.append('Authorization', 'Bearer ' + bearerToken);
    }

    return headers;
  }

  protected getBearer(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(FunixProdHttpClient.LOCAL_STORAGE_KEY_AUTH);
    } else {
      return null;
    }
  }

}
