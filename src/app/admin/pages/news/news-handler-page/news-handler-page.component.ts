import {Component, OnInit} from '@angular/core';
import {ErrorDto, PacifistaNewsDTO, PacifistaNewsService} from "@funixproductions/funixproductions-requests";
import {HttpClient} from "@angular/common/http";
import NotificationService from "../../../../services/notifications/services/NotificationService";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import MarkdownIt from 'markdown-it';
import NewsService from "../../../../pages/news/NewsService";

@Component({
  selector: 'app-news-handler-page',
  templateUrl: './news-handler-page.component.html',
  styleUrl: './news-handler-page.component.scss'
})
export class NewsHandlerPageComponent implements OnInit {

  protected name: string = '';
  protected nameErrors: string[] = [];

  protected title: string = '';
  protected titleErrors: string[] = [];

  protected subTitle: string = '';
  protected subTitleErrors: string[] = [];

  protected bodyMarkdown: string = '';
  protected bodyMarkdownErrors: string[] = [];

  protected draft: boolean = true;

  protected articleImage?: File
  protected news?: PacifistaNewsDTO;
  protected actualArticleImageUrl?: string;
  protected uploadedImagePreview?: string | ArrayBuffer | null;

  protected loading: boolean = false;
  protected formSent: boolean = false;

  protected showLivePreview: boolean = false;
  protected bodyHtml: string = '';

  private readonly newsService: PacifistaNewsService;

  protected readonly mdParser = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  constructor(httpClient: HttpClient,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.newsService = new PacifistaNewsService(httpClient, environment.production);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const newsName = params['newsName'];
      if (!newsName) {
        this.router.navigate(['/admin/news']);
        return;
      }

      if (newsName !== 'create') {
        this.newsService.getNewsByName(newsName).subscribe({
          next: (news) => {
            this.name = news.name;
            this.title = news.title;
            this.subTitle = news.subtitle;
            this.bodyMarkdown = news.bodyMarkdown;
            this.draft = news.draft;

            this.actualArticleImageUrl = NewsService.getImageUrl(news);
            this.news = news;
          },
          error: (err: ErrorDto) => {
            this.notificationService.onErrorRequest(err);
            this.router.navigate(['/admin/news']);
          }
        });
      }
    });
  }

  setFile(file?: File) {
    if (file) {
      if (file.type.split('/')[0] !== 'image') {
        this.notificationService.error('Le fichier que vous avez ajouté n\'est pas une image.');
        this.uploadedImagePreview = undefined;
        this.articleImage = undefined;
      } else {
        this.articleImage = file;

        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedImagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.uploadedImagePreview = undefined;
    }
  }

  sendRequest() {
    this.loading = true;
    this.formSent = false;
    this.nameErrors = [];
    this.titleErrors = [];
    this.subTitleErrors = [];
    this.bodyMarkdownErrors = [];

    if (this.news) {
      this.updateNews();
    } else {
      this.createNews();
    }
  }

  private updateNews() {
    if (!this.news) return;
    if (this.articleImage && this.articleImage.type.split('/')[0] !== 'image') {
      this.notificationService.error('Le fichier que vous avez ajouté n\'est pas une image.');
      return;
    }

    this.news.name = this.name;
    this.news.title = this.title;
    this.news.subtitle = this.subTitle;
    this.news.bodyHtml = this.mdParser.render(this.bodyMarkdown);
    this.news.bodyMarkdown = this.bodyMarkdown;
    this.news.draft = this.draft;

    this.newsService.updateNews(this.news, this.articleImage).subscribe({
      next: (news: PacifistaNewsDTO) => {
        this.loading = false;
        this.notificationService.info(`La news ${news.title} a bien été modifiée.`);
        this.router.navigate(['/admin/news']);
      },
      error: (err: ErrorDto) => {
        this.loading = false;
        this.formSent = true;
        this.notificationService.onErrorRequest(err);
        this.handleError(err);
      }
    })
  }

  private createNews() {
    if (!this.articleImage) {
      this.notificationService.error('Vous devez ajouter une image à votre article.');
      this.loading = false;
      return;
    } else if (this.articleImage.type.split('/')[0] !== 'image') {
      this.notificationService.error('Le fichier que vous avez ajouté n\'est pas une image.');
      this.loading = false;
      return;
    }

    this.newsService.createNews(new PacifistaNewsDTO(
        this.name,
        this.title,
        this.subTitle,
        this.mdParser.render(this.bodyMarkdown),
        this.bodyMarkdown,
        this.draft
    ), this.articleImage).subscribe({
      next: (news) => {
        this.loading = false;
        this.notificationService.info(`La news ${news.title} a bien été créée.`);
        this.router.navigate(['/admin/news']);
      },
      error: (err: ErrorDto) => {
        this.loading = false;
        this.formSent = true;
        this.notificationService.onErrorRequest(err);
        this.handleError(err);
      }
    });
  }

  private handleError(err: ErrorDto) {
    err.fieldErrors.forEach(fieldError => {
      switch (fieldError.field) {
        case 'name':
          this.nameErrors.push(fieldError.message);
          break;
        case 'title':
          this.titleErrors.push(fieldError.message);
          break;
        case 'subtitle':
          this.subTitleErrors.push(fieldError.message);
          break;
        case 'bodyMarkdown':
          this.bodyMarkdownErrors.push(fieldError.message);
          break;
      }
    });
  }
}