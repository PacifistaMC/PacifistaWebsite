import ApiDTO from "../../../core/dtos/ApiDTO";
import {UserDTO} from "./UserDTO";

export default class UserTokenDTO extends ApiDTO {
  user?: UserDTO;
  token?: string;
  expirationDate?: Date
}
