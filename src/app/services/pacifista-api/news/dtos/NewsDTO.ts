import ApiDTO from "../../../core/http/dtos/ApiDTO";

export default class NewsDTO extends ApiDTO {
  originalWriter?: string;
  updateWriter?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  articleImageUrl?: string;
  body?: string;
  likesAmount?: number;
  commentsAmount?: number;
}
