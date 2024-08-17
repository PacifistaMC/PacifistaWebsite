import {ApiDTO, CrudHttpClient, ErrorDto, PageOption, QueryBuilder} from "@funixproductions/funixproductions-requests";
import NotificationService from "../notifications/services/NotificationService";
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

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
    column: string;
    direction: SortDirection;
}

const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
    selector: 'th[sortable]',
    standalone: true,
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()',
    },
})
export class NgbdSortableHeader implements OnInit {
    @Input() sortable: string = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    private spanIcon?: HTMLElement;

    constructor(private renderer: Renderer2, private el: ElementRef) {}

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
            this.renderer.setProperty(this.spanIcon, 'innerHTML', '&#9650;'); // Up arrow
        } else if (this.direction === 'desc') {
            this.renderer.setProperty(this.spanIcon, 'innerHTML', '&#9660;'); // Down arrow
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

    protected readonly maxElemsPerPage: number = 30
    private readonly client: CLIENT
    private readonly notificationService: NotificationService

    @ViewChildren(NgbdSortableHeader) headers?: QueryList<NgbdSortableHeader>;

    protected constructor(client: CLIENT,
                          notificationService: NotificationService) {
        this.client = client
        this.notificationService = notificationService
        this.list = []
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

    protected updateList(): void {
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

        this.client.find(pageOption, new QueryBuilder()).subscribe({
            next: pageDTO => {
                this.list = pageDTO.content
                this.allElemsDatabase = pageDTO.totalElementsDatabase
            },
            error: (err: ErrorDto) => {
                this.notificationService.onErrorRequest(err)
            }
        })
    }

}