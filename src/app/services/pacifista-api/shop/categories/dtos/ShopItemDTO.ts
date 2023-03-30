import ApiDTO from "../../../../core/dtos/ApiDTO";

export default class ShopItemDTO extends ApiDTO {
  name?: string;
  description?: string;
  htmlDescription?: string;
  logoUrl?: string;
  price?: number;
}
