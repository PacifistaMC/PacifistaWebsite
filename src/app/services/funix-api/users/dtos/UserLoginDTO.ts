import ApiDTO from "../../../core/dtos/ApiDTO";

export default class UserLoginDTO extends ApiDTO {
  username: string = '';
  password: string = '';
  stayConnected: boolean = false;
  googleCaptcha: string = '';
}
