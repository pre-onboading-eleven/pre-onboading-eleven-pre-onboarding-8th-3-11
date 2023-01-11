// SearchServiceInterface
// checkCache(keyword): Promise<string>
// getCache(keyword): SearchResult[]
// get(keyword): Promise<SearchResult[]>
import { SearchResult, NoResultArray } from '../types';
import { NO_RESULT, IN_RESULT, NEW_RESULT } from '../constants';

export class SearchService {
  #httpClient;
  #cacheRepository;
  #NO_RESULT = NO_RESULT;
  #IN_RESULT = IN_RESULT;
  #NEW_RESULT = NEW_RESULT;
  #NO_RESULT_ARRAY: NoResultArray = [];
  #IN_RESULT_ARRAY: SearchResult[] = [];

  constructor(httpClient: any, cacheRepository: any) {
    this.#httpClient = httpClient;
    this.#cacheRepository = cacheRepository;
  }

  checkCache(keyword = '') {
    if (keyword === '') return Promise.resolve(this.#NO_RESULT);

    this.#NO_RESULT_ARRAY = this.#cacheRepository.getNoResult();
    if (this.#NO_RESULT_ARRAY.includes(keyword)) {
      return Promise.resolve(this.#NO_RESULT);
    }

    this.#IN_RESULT_ARRAY = this.#cacheRepository.getInResult();

    for (const item of this.#IN_RESULT_ARRAY) {
      if (item.letter === keyword) return Promise.resolve(this.#IN_RESULT);
    }

    return Promise.resolve(this.#NEW_RESULT);
  }

  getCache(keyword: string) {
    return this.#IN_RESULT_ARRAY.filter(item => item.letter === keyword);
  }

  async getServer(keyword: string) {
    if (!keyword) return;
    return this.#httpClient.fetch(keyword);
  }
}
