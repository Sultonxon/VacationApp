

export class PagedResult<T>{
  constructor(){

  }

  public items: T[] = [];
  public page: number = 1;
  public pageSize: number = 20;
  public totalCount: number = 0;
  public totalPages: number = 1;
}
