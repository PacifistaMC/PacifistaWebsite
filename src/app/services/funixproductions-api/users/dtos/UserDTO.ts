import ApiDTO from "../../../core/http/dtos/ApiDTO";

export enum UserRole {
  USER = "USER",
  MODERATOR = "MODERATOR",
  PACIFISTA_MODERATOR = "PACIFISTA_MODERATOR",
  PACIFISTA_ADMIN = "PACIFISTA_ADMIN",
  ADMIN = "ADMIN"
}

export class UserDTO extends ApiDTO {
  username?: string;
  email?: string;
  role?: UserRole
}
