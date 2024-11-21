import {
    CrudHttpClient,
    PacifistaNewsDTO,
    PacifistaNewsService,
    PageOption,
    Paginated,
    QueryBuilder
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

export default class DummyNewsCrudClient extends CrudHttpClient<PacifistaNewsDTO> {

    private readonly realService: PacifistaNewsService;

    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            'http://notFound.js.gouv:8080/api/wtfIsThis/yesItsADummy',
            'web/news'
        );

        this.realService = new PacifistaNewsService(httpClient, environment.production);
    }


    override find(options: PageOption, _: QueryBuilder): Observable<Paginated<PacifistaNewsDTO>> {
        return this.realService.getAllNews(options.page, true);
    }

    override getById(id: string): Observable<PacifistaNewsDTO> {
        return this.realService.getNewsById(id, true);
    }

    override create(_: PacifistaNewsDTO): Observable<PacifistaNewsDTO> {
        return new Observable();
    }

    override patch(_: PacifistaNewsDTO): Observable<PacifistaNewsDTO> {
        return new Observable();
    }

    override update(_: PacifistaNewsDTO): Observable<PacifistaNewsDTO> {
        return new Observable();
    }

    override delete(_: string): Observable<any> {
        return new Observable();
    }
}