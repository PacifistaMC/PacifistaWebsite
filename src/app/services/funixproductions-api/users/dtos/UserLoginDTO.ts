import ApiDTO from "../../../core/http/dtos/ApiDTO";

export default class UserLoginDTO extends ApiDTO {
  username: string = '';
  password: string = '';
  stayConnected: boolean = false;
}
