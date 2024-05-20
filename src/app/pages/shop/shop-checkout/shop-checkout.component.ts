import {AfterViewInit, Component, Inject} from '@angular/core';
import {PacifistaPage} from "../../../components/pacifista-page/pacifista-page";
import {Title} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";
import ShopService from "../shop-service";
import {
  PacifistaWebUserLinkDTO,
  PacifistaWebUserLinkService,
  UserAuthService,
  UserDTO
} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.scss']
})
export class ShopCheckoutComponent extends PacifistaPage implements AfterViewInit {

  protected override readonly title: string = "Boutique - Panier";
  protected override readonly canonicalPath: string = "shop/checkout";
  protected override readonly pageDescription: string = "Boutique de Pacifista. Soutenez le serveur minecraft avec des avantages uniques !";

  currentUser?: UserDTO
  minecraftAccount?: PacifistaWebUserLinkDTO;
  loadedUser: boolean = false;
  loadedMinecraft: boolean = false;

  private readonly userService: UserAuthService;
  private readonly minecraftLinkService: PacifistaWebUserLinkService;

  constructor(title: Title,
              httpClient: HttpClient,
              @Inject(DOCUMENT) doc: Document,
              protected shopService: ShopService) {
    super(title, doc);
    this.userService = new UserAuthService(httpClient, environment.production);
    this.minecraftLinkService = new PacifistaWebUserLinkService(httpClient, environment.production);
  }

  ngAfterViewInit(): void {
    this.userService.currentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadedUser = true;

        this.minecraftLinkService.getCurrentUserLink().subscribe({
          next: (link) => {
            this.minecraftAccount = link;
            this.loadedMinecraft = true;
          },
          error: () => {
            this.loadedMinecraft = true;
          }
        })
      },
      error: () => {
        this.loadedUser = true;
      }
    })
  }

}
