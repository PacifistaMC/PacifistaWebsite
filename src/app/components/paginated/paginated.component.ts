import {
    ApiDTO,
    CrudHttpClient,
    ErrorDto,
    PacifistaPlayerDataDTO,
    PacifistaPlayerDataService,
    PageOption,
    QueryBuilder,
    QueryParam
} from "@funixproductions/funixproductions-requests";
import NotificationService from "../../services/notifications/services/NotificationService";
import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChildren
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {$$deepEqual} from "@jsonjoy.com/util/lib/json-equal/$$deepEqual";

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
    column: string;
    direction: SortDirection;
}

const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
    selector: 'th[searchable]',
    standalone: true,
    host: {
        '(input)': 'searchEvent()'
    }
})
export class NgbdSearchableHeader implements OnInit {
    @Input() searchable: string = '';
    @Output() search = new EventEmitter<QueryParam>();

    private inputText?: HTMLInputElement;

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit(): void {
        this.inputText = this.renderer.createElement('input');
        this.renderer.addClass(this.inputText, 'input-text');
        this.renderer.addClass(this.inputText, 'ms-2');
        this.renderer.setAttribute(this.inputText, 'type', 'text');
        this.renderer.setAttribute(this.inputText, 'placeholder', 'Recherche...');
        this.renderer.appendChild(this.el.nativeElement, this.inputText);
    }

    searchEvent(): void {
        const param = new QueryParam()

        param.key = this.searchable
        param.value = this.inputText?.value ?? ''
        param.type = QueryBuilder.startWithIgnoreCase

        this.search.emit(param);
    }

    protected readonly $$deepEqual = $$deepEqual;
}

@Directive({
    selector: 'th[sortable]',
    standalone: true,
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"'
    },
})
export class NgbdSortableHeader implements OnInit {
    @Input() sortable: string = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    private spanIcon?: HTMLElement;

    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.renderer.listen(this.el.nativeElement, 'click', (event: Event) => {
            if ((event.target as HTMLElement).tagName !== 'INPUT') {
                this.rotate();
            }
        });
    }

    ngOnInit(): void {
        this.spanIcon = this.renderer.createElement('span');
        this.renderer.addClass(this.spanIcon, 'sort-icon');
        this.renderer.appendChild(this.el.nativeElement, this.spanIcon);
        this.updateIcon();
    }

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
        this.updateIcon();
    }

    updateIcon() {
        if (this.direction === 'asc') {
            this.renderer.setProperty(this.spanIcon, 'innerHTML', '&#9650;');
        } else if (this.direction === 'desc') {
            this.renderer.setProperty(this.spanIcon, 'innerHTML', '&#9660;');
        } else {
            this.renderer.setProperty(this.spanIcon, 'innerHTML', '');
        }
    }
}

@Directive()
export abstract class PaginatedComponent<DTO extends ApiDTO, CLIENT extends CrudHttpClient<DTO>> {

    protected page: number = 0
    protected allElemsDatabase: number = 0
    protected list: DTO[] = []
    private sort?: SortEvent
    private queryBuilder: QueryBuilder

    protected readonly maxElemsPerPage: number = 30
    protected readonly client: CLIENT
    protected readonly notificationService: NotificationService
    private readonly pacifistaPlayerDataService: PacifistaPlayerDataService

    @ViewChildren(NgbdSortableHeader) headers?: QueryList<NgbdSortableHeader>;

    protected constructor(client: CLIENT,
                          httpClient: HttpClient,
                          notificationService: NotificationService) {
        this.client = client
        this.notificationService = notificationService
        this.list = []
        this.queryBuilder = new QueryBuilder()
        this.pacifistaPlayerDataService = new PacifistaPlayerDataService(httpClient, environment.production)
    }

    public delete(dto: DTO): void {
        if (!dto.id) {
            return
        }

        this.client.delete(dto.id).subscribe({
            next: () => {
                const index = this.list.indexOf(dto)

                if (index !== -1) {
                    this.list.splice(index, 1)
                }
                this.notificationService.info('L\'élément a bien été supprimé')
            },
            error: (err: ErrorDto) => {
                this.notificationService.onErrorRequest(err)
            }
        });
    }

    protected onSort({ column, direction }: SortEvent): void {
        if (this.headers) {
            for (const header of this.headers) {
                if (header.sortable !== column) {
                    header.direction = '';
                    header.updateIcon();
                }
            }
        }

        if (direction === '') {
            this.sort = undefined
        } else {
            this.sort = { column, direction }
        }

        this.updateList()
    }

    protected search(queryParam: QueryParam): void {
        this.queryBuilder.addParam(queryParam)
        this.updateList()
    }

    protected updateList(callback: () => void = () => {}): void {
        const pageOption = new PageOption();
        pageOption.elemsPerPage = this.maxElemsPerPage
        pageOption.page = this.page - 1

        if (this.sort) {
            pageOption.sort = `${this.sort.column}:${this.sort.direction}`
        } else {
            pageOption.sort = "createdAt:desc"
        }

        if (pageOption.page < 0) {
            pageOption.page = 0
        }

        this.client.find(pageOption, this.queryBuilder).subscribe({
            next: pageDTO => {
                this.list = pageDTO.content
                this.allElemsDatabase = pageDTO.totalElementsDatabase
                callback()
            },
            error: (err: ErrorDto) => {
                this.notificationService.onErrorRequest(err)
                callback()
            }
        })
    }

    protected fetchPlayerDataFromList(idsList: string[],
                                      callback: (data: PacifistaPlayerDataDTO[]) => void): void {
        const queryBuilder = new QueryBuilder()

        const queryParam = new QueryParam()
        queryParam.key = "minecraftUuid"
        queryParam.value = idsList
        queryParam.type = QueryBuilder.equal
        queryBuilder.addParam(queryParam)

        this.pacifistaPlayerDataService.find(new PageOption(), queryBuilder).subscribe({
            next: pageDTO => {
                callback(pageDTO.content)
            },
            error: (err: ErrorDto) => {
                this.notificationService.onErrorRequest(err)
            }
        })
    }

    protected findPlayerDataFromUsername(username: string, startWith: boolean = true, callback: (data: PacifistaPlayerDataDTO[]) => void) {
        const queryBuilder = new QueryBuilder()

        const queryParam = new QueryParam()
        queryParam.key = "minecraftUsername"
        queryParam.value = username
        queryParam.type = startWith ? QueryBuilder.startWithIgnoreCase : QueryBuilder.equal
        queryBuilder.addParam(queryParam)

        this.pacifistaPlayerDataService.find(new PageOption(), queryBuilder).subscribe({
            next: pageDTO => {
                callback(pageDTO.content)
            },
            error: (err: ErrorDto) => {
                this.notificationService.onErrorRequest(err)
            }
        })
    }

}