import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
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
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MinecraftHeadComponent} from "./components/minecraft-head/minecraft-head.component";
import {
    StaffAccueuilSectionRowPlayerComponent
} from "./pages/accueil/components/staff/staff-accueuil-section-row-player/staff-accueuil-section-row-player.component";

@NgModule({ declarations: [
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
        StaffAccueuilSectionRowPlayerComponent,
        AboutAccueilSectionComponent
    ],
    exports: [
        NotificationComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NewsModule,
        NgOptimizedImage,
        MinecraftHeadComponent
    ],
    providers: [
        Title,
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
