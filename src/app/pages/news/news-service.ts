import {PacifistaNewsDTO} from "@funixproductions/funixproductions-requests";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export default class NewsService {

    constructor() {
    }

    public static getImageUrl(news: PacifistaNewsDTO, thumbnail: boolean = false): string {
        return environment.pacifistaApiDomain + 'web/news/file/' + (thumbnail ? news.articleImageIdLowRes : news.articleImageId);
    }

}