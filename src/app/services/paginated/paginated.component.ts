import {ApiDTO, CrudHttpClient, ErrorDto, PageOption, QueryBuilder} from "@funixproductions/funixproductions-requests";
import NotificationService from "../notifications/services/NotificationService";


export abstract class PaginatedComponent<DTO extends ApiDTO, CLIENT extends CrudHttpClient<DTO>> {

    protected page: number = 0
    protected allElemsDatabase: number = 0
    protected list: DTO[] = []

    protected readonly maxElemsPerPage: number = 30
    private readonly client: CLIENT
    private readonly notificationService: NotificationService

    protected constructor(client: CLIENT,
                          notificationService: NotificationService) {
        this.client = client
        this.notificationService = notificationService
        this.list = []
    }

    protected onSort(event: any): void {

    }

    protected updateList(): void {
        const pageOption = new PageOption();
        pageOption.elemsPerPage = this.maxElemsPerPage
        pageOption.page = this.page - 1
        pageOption.sort = "createdAt:desc"

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