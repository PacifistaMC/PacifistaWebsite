import ApiDTO from "../../../core/dtos/ApiDTO";
import {UserDTO} from "../../../funix-api/users/dtos/UserDTO";

export default class NewsDTO extends ApiDTO {
  originalWriter?: UserDTO;
  updateWriter?: UserDTO;
  name?: string;
  title?: string;
  subtitle?: string;
  articleImageUrl?: string;
  body?: string;
  likesAmount?: number;
  commentsAmount?: number;
}
