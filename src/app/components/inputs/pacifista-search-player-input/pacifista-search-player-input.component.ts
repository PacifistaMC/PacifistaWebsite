import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {
  ErrorDto,
  PacifistaPlayerDataDTO,
  PacifistaPlayerDataService,
  PageOption,
  QueryBuilder,
  QueryParam
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {InputTextComponent} from "../input-text/input-text.component";
import {NgForOf, NgIf} from "@angular/common";
import {MinecraftHeadComponent} from "../../minecraft-head/minecraft-head.component";

@Component({
    selector: 'pacifista-search-player-input',
    imports: [
        InputTextComponent,
        NgIf,
        NgForOf,
        MinecraftHeadComponent
    ],
    templateUrl: './pacifista-search-player-input.component.html',
    styleUrl: './pacifista-search-player-input.component.scss'
})
export class PacifistaSearchPlayerInputComponent implements AfterViewInit {

  @Input() label: string = 'Recherche de joueur';
  @Input() placeholder: string = 'Nom du joueur';
  @Input() id: string = 'searchPacifistaPlayer';
  @Input() text: string = '';
  @Input() required: boolean = true;
  @Input() formSent: boolean = false;
  @Input() inputErrors: string[] = [];
  @Input() showRemovePlayerButton: boolean = true;

  @Output() onPlayerSelected = new EventEmitter<PacifistaPlayerDataDTO>();
  @Output() onPlayerClear = new EventEmitter<void>();

  propositionList: PacifistaPlayerDataDTO[] = [];
  errorRequest: string = '';
  loading: boolean = false;
  doneSearching: boolean = false;
  playerSelected: PacifistaPlayerDataDTO | null = null;
  @ViewChild('resultsContainer') resultsContainer?: ElementRef;

  private readonly service: PacifistaPlayerDataService;
  private readonly pageOption: PageOption;

  constructor(httpClient: HttpClient,
              private renderer: Renderer2) {
    this.service = new PacifistaPlayerDataService(httpClient, true);

    let pageOption = new PageOption();
    pageOption.page = 0;
    pageOption.elemsPerPage = 5;
    pageOption.sort = 'minecraftUsername:asc';
    this.pageOption = pageOption;

    this.renderer.listen('window', 'click', (event: Event) => {
      if (this.resultsContainer && !this.resultsContainer.nativeElement.contains(event.target)) {
        this.doneSearching = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.searchUser();
  }

  onInputTextChange(text: string): void {
    this.text = text;
    this.searchUser();
  }

  clear(): void {
    this.text = '';
    this.propositionList = [];
    this.doneSearching = false;
    this.playerSelected = null;
    this.onPlayerClear.emit();
  }

  selectUser(player: PacifistaPlayerDataDTO): void {
    if (player.minecraftUsername) {
      this.text = player.minecraftUsername;
    }
    this.doneSearching = false;
    this.propositionList = [];
    this.playerSelected = player;
    this.onPlayerSelected.emit(player);
  }

  searchUser(): void {
    this.errorRequest = '';

    if (this.text.length > 2) {
      this.loading = true;
      this.doneSearching = false;

      let queryParam = new QueryParam();
      queryParam.key = 'minecraftUsername';
      queryParam.type = QueryBuilder.startWithIgnoreCase;
      queryParam.value = this.text;

      let queryBuilder = new QueryBuilder();
      queryBuilder.addParam(queryParam);

      this.service.find(this.pageOption, queryBuilder).subscribe({
        next: (response) => {
          this.propositionList = response.content;
          this.loading = false;
          this.doneSearching = true;
        },
        error: (error: ErrorDto) => {
          this.errorRequest = "Erreur serveur lors de la recherche : " + error.error + ". Code d'erreur : " + error.status + ".";
          this.propositionList = [];
          this.loading = false;
          this.doneSearching = true;
        }
      })
    } else {
      this.propositionList = [];
    }
  }
}
