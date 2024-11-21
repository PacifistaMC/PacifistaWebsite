import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {PacifistaNewsDTO, PacifistaNewsService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'news-section',
    templateUrl: './news-accueil-section.component.html',
    styleUrls: ['./news-accueil-section.component.scss'],
    standalone: false
})
export class NewsAccueilSectionComponent implements OnInit {

  private readonly newsService: PacifistaNewsService;

  newsList: PacifistaNewsDTO[] = [];
  totalNews: number = 0;

  constructor(@Inject(PLATFORM_ID) private platfomId: Object,
              httpClient: HttpClient) {
    this.newsService = new PacifistaNewsService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.newsService.getAllNews(0, false).subscribe(newsList => {
      this.newsList = newsList.content.slice(0, 3);
      this.totalNews = newsList.totalElementsDatabase;
    });
  }

}
