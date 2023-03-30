import {HttpHeaders} from "@angular/common/http";

export default abstract class FunixProdHttpClient {

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
      return localStorage.getItem('user-token-requests');
    } else {
      return null;
    }
  }

}
