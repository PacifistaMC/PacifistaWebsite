import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import ApiDTO from "../dtos/ApiDTO";
import FunixProdHttpClient from "./FunixProdHttpClient";
import {environment} from "../../../../../environments/environment";
import {PageOption, Paginated} from "../dtos/PaginatedDTO";
import {QueryBuilder} from "../utils/QueryBuilder";

interface RequestParams {
  elemsPerPage?: number;
  page?: number;
  sort?: string;
  search?: string;
}

export default abstract class CrudHttpClient<DTO extends ApiDTO> extends FunixProdHttpClient {

  domain: string = environment.funixProductionsApiDomain;
  path: string = '';

  protected constructor(protected http: HttpClient) {
    super();
  }

  /**
   * Find and search
   * @param options set the data returned amount
   * @param queryBuilder can be null new QueryBuilder().addParam({key: "mdr", type: QueryBuilder.like, value: "mdr"})
   */
  find(options: PageOption, queryBuilder: QueryBuilder): Observable<Paginated<DTO>> {
    const params: RequestParams = {
      page: options.page,
      elemsPerPage: options.elemsPerPage || 10,
      sort: options.sort!,
      search: (queryBuilder === null ? '' : queryBuilder.get())
    };

    return this.http.get<Paginated<DTO>>(this.domain + this.path, {headers: this.getHeaders(), params: {...params}});
  }

  getById(id: string): Observable<DTO> {
    return this.http.get<DTO>(this.domain + this.path + "/" + id, {headers: this.getHeaders()});
  }

  create(dto: DTO): Observable<DTO> {
    return this.http.post<DTO>(this.domain + this.path, dto, {headers: this.getHeaders()})
  }

  patch(dto: DTO): Observable<DTO> {
    return this.http.patch<DTO>(this.domain + this.path, dto, {headers: this.getHeaders()})
  }

  delete(id: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams().set('id', id);

    return this.http.delete(this.domain + this.path, {
      params: httpParams,
      headers: this.getHeaders()
    })
  }
}
