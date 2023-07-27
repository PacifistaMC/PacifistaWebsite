export class QueryParam  {
  key: string = '';
  type: string = ':eq:';
  value?: string | string[];
}

export class QueryBuilder {

  static like: string = ':like:'
  static equal: string = ':eq:'
  static notEqual: string = ':neq:'
  static greater: string = ':gt:'
  static lower: string = ':lt:'

  queryArray: QueryParam[] = [];

  get(): string {
    if (this.queryArray.length <= 0) {
      return "";
    }
    const queryList: string[] = [];
    this.queryArray.forEach(it => {
      if (Array.isArray(it.value)) {
        if (it.value.length === 1) {
          queryList.push(it.key + it.type + it.value[0])
        } else {
          queryList.push(it.key + it.type + '[' + it.value.join('|') + ']')
        }
      } else {
        queryList.push(it.key + it.type + it.value)
      }
    });
    return queryList.join(',');
  }

  addParam(param: QueryParam) : QueryBuilder {
    if (param?.value && param.value.length > 0) {
      this.queryArray.push(param);
    }
    return this;
  }

  reset(): void {
    this.queryArray = [];
  }
}
