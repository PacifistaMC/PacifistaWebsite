import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {AccueilComponent} from './pages/accueil/accueil/accueil.component';
import {NewsCardComponent} from './pages/news/news-card/news-card.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CguComponent} from './pages/legal/cgu/cgu.component';
import {CgvComponent} from './pages/legal/cgv/cgv.component';
import {AboutComponent} from './pages/about/about.component';
import {JoinComponent} from './pages/join/join.component';
import {NewsListPageComponent} from './pages/news/news-list-page/news-list-page.component';
import {VotePageComponent} from './pages/vote/vote-page/vote-page.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgOptimizedImage} from "@angular/common";
import {NotificationComponent} from "./components/notification/notification.component";

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    NewsCardComponent,
    CguComponent,
    CgvComponent,
    AboutComponent,
    JoinComponent,
    NewsListPageComponent,
    VotePageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgOptimizedImage
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
