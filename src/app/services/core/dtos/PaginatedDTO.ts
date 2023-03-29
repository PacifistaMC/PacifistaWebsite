import ApiDTO from "./ApiDTO";

export class Paginated<T extends ApiDTO> {
  content: T[] = [];
  actualPage: number = 0;
  totalPages: number = 1;
  totalElementsThisPage: number = 0;
  totalElementsDatabase: number = 0;
}

export class PageOption {
  elemsPerPage: number = 15;
  page: number = 0;
  sort: string = '';
}

