import CrudHttpClient from "../../../core/http/services/CrudHttpClient";
import NewsDTO from "../dtos/NewsDTO";
import {environment} from "../../../../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export default class NewsService extends CrudHttpClient<NewsDTO> {
  override domain: string = environment.pacifistaApiDomain;
  override path: string = 'web/news';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
