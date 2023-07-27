import ApiDTO from "../../../core/http/dtos/ApiDTO";

export default class UserCreationDTO extends ApiDTO {
  username: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  acceptCGV: boolean = false;
  acceptCGU: boolean = false;
}
