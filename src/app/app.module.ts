import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { NewsCardComponent } from './pages/news/news-card/news-card.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { CguComponent } from './pages/legal/cgu/cgu.component';
import { CgvComponent } from './pages/legal/cgv/cgv.component';
import { AboutComponent } from './pages/about/about.component';
import { JoinComponent } from './pages/join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AccueilComponent,
    NewsCardComponent,
    CguComponent,
    CgvComponent,
    AboutComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
