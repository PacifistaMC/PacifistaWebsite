import {Injectable} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiDTO, CrudHttpClient} from "@funixproductions/funixproductions-requests";
import {AdminDeleteModalComponent} from "./components/admin-delete-modal/admin-delete-modal.component";
import {PaginatedComponent} from "../components/paginated/paginated.component";

@Injectable()
export default class AdminModalService {

    constructor(private modalService: NgbModal) {
    }

    openDeleteModal<T extends ApiDTO, CLIENT extends CrudHttpClient<T>, COMPONENT extends PaginatedComponent<T, CLIENT>>(dto: T, paginatedComponent: COMPONENT): void {
        const modalRef = this.modalService.open(AdminDeleteModalComponent<T, CLIENT>, {centered: true})

        modalRef.componentInstance.dto = dto;
        modalRef.componentInstance.client = paginatedComponent.client;
        modalRef.componentInstance.onDelete.subscribe({
            next: (deleted: boolean) => {
                if (deleted) {
                    paginatedComponent.delete(dto);
                }
            }
        })
    }

}