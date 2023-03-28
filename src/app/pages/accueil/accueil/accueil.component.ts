import {Component, OnInit} from '@angular/core';
import NewsDTO from "../../../services/pacifista-api/news/dtos/NewsDTO";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  playersAmount: number = 0;
  newsList: NewsDTO[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.playersAmount = 0;

    const news = new NewsDTO();
    news.title = "Test news";
    news.subtitle = "Voici une news test, c'est pour faire des tests super chouettes.";
    news.createdAt = new Date();
    news.articleImageUrl = "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/4/28/bjoyslzjb3uxqyg82uz2/minecraft";
    news.body = "toSet";
    news.commentsAmount = 10;
    news.likesAmount = 11;
    news.name = "test"
    news.originalWriter = new NewsDTO();
    news.originalWriter.username = "FunixGaming"

    const news2 = new NewsDTO();
    news2.title = "Test news2";
    news2.subtitle = "Voici une news2 test, c'est pour faire des tests super chouettes.";
    news2.createdAt = new Date();
    news2.body = "toSet";
    news2.commentsAmount = 10;
    news2.likesAmount = 11;
    news2.name = "test2"
    news2.articleImageUrl = "https://stylmonde-thermoformage.com/wp-content/uploads/2020/11/Allize-Plasturgie-shooting-StylMonde-19-fevrier-2020-9-988-modif-Web.jpg";
  }


}
