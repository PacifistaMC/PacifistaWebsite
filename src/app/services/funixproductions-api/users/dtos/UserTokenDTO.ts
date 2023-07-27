import ApiDTO from "../../../core/http/dtos/ApiDTO";
import {UserDTO} from "./UserDTO";

export default class UserTokenDTO extends ApiDTO {
  user?: UserDTO;
  token?: string;
  expirationDate?: Date
}
