import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NewsModule} from "./pages/news/news.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NotificationComponent} from "./components/notification/notification.component";
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {WelcomeAccueilSectionComponent} from "./pages/accueil/components/welcome/welcome-accueil-section.component";
import {
  AboutDetailsAccueilSectionComponent
} from "./pages/accueil/components/about-details/about-details-accueil-section.component";
import {NewsAccueilSectionComponent} from "./pages/accueil/components/news/news-accueil-section.component";
import {SocialsAccueilSectionComponent} from "./pages/accueil/components/socials/socials-accueil-section.component";
import {StaffAccueilSectionComponent} from "./pages/accueil/components/staff/staff-accueil-section.component";
import {AboutAccueilSectionComponent} from "./pages/accueil/components/about/about-accueil-section.component";

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NavbarComponent,
    FooterComponent,

    AccueilComponent,
    WelcomeAccueilSectionComponent,
    AboutDetailsAccueilSectionComponent,
    NewsAccueilSectionComponent,
    SocialsAccueilSectionComponent,
    StaffAccueilSectionComponent,
    AboutAccueilSectionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'pacifista-website'}),
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NewsModule,
    NgOptimizedImage,
    NgIf,
    NgForOf
  ],
  providers: [
    Title,
    provideClientHydration()
  ],
  exports: [
    NotificationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
