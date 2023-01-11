// SearchServiceInterface
// get(keyword): Promise<search{}>

export class SearchService {
  #httpClient;

  constructor(httpClient: any) {
    this.#httpClient = httpClient;
  }

  async get(keyword: string) {
    // 여기에서 비즈니스 로직 다루기
    if (!keyword) return;
    const result = this.#httpClient.fetch(keyword);

    return result;
  }
}
