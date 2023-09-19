import {AfterViewInit, Component} from '@angular/core';
import NewsDTO from "../../../../services/pacifista-api/news/dtos/NewsDTO";
import NewsService from "../../../../services/pacifista-api/news/services/NewsService";
import {PageOption} from "../../../../services/core/http/dtos/PaginatedDTO";

@Component({
  selector: 'news-section',
  templateUrl: './news-accueil-section.component.html',
  styleUrls: ['./news-accueil-section.component.scss']
})
export class NewsAccueilSectionComponent implements AfterViewInit {

  newsList: NewsDTO[] = [];
  totalNews: number = 0;

  constructor(private newsService: NewsService) {
  }

  ngAfterViewInit(): void {
    const pageOption = new PageOption();
    pageOption.elemsPerPage = 3;
    pageOption.sort = 'createdAt:desc';

    this.newsService.find(pageOption, null).subscribe(newsList => {
      this.newsList = newsList.content;
      this.totalNews = newsList.totalElementsDatabase;
    });
  }

}
