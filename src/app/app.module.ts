import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {AccueilComponent} from './pages/accueil/accueil/accueil.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CguComponent} from './pages/legal/cgu/cgu.component';
import {CgvComponent} from './pages/legal/cgv/cgv.component';
import {AboutComponent} from './pages/about/about.component';
import {JoinComponent} from './pages/join/join.component';
import {VotePageComponent} from './pages/vote/vote-page/vote-page.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {NewsModule} from "./pages/news/news.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NotificationComponent} from "./components/notification/notification.component";

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    CguComponent,
    CgvComponent,
    AboutComponent,
    JoinComponent,
    VotePageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NewsModule,
    NgOptimizedImage
  ],
  providers: [
    Title
  ],
  exports: [
    NotificationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
