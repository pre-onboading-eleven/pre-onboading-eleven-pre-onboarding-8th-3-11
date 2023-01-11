// SearchServiceInterface
// checkCache(keyword): Promise<string>
// getCache(keyword): SearchResult[]
// getServer(keyword): SearchResult[]
// setCacheNoResult(keyword):void
// convertResult(ApiResponse): SearchResult['values']

import { SearchResult, NoResultArray, ApiResponse } from '../types/types';
import { NO_RESULT, IN_RESULT, NEW_RESULT } from '../constant/constants';

export class SearchService {
  #httpClient;
  #cacheRepository;
  #NO_RESULT = NO_RESULT;
  #IN_RESULT = IN_RESULT;
  #NEW_RESULT = NEW_RESULT;
  #NO_RESULT_ARRAY: NoResultArray = [];
  #IN_RESULT_ARRAY: SearchResult[] = [];
  #MAX_LENGTH_RESULT = 7;

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

  setCacheNoResult(keyword: string) {
    this.#cacheRepository.saveNoResult(keyword);
  }

  setCacheInResult(result: SearchResult) {
    this.#cacheRepository.saveInResult(result);
  }

  convertResult(result: ApiResponse[]) {
    // sickNm 짧은 순서대로 정렬해서 7개까지 리턴
    const length = Math.min(result.length, this.#MAX_LENGTH_RESULT);
    const returns = [];
    result.sort((a, b) => a.sickNm.length - b.sickNm.length);
    for (let i = 0; i < length; i++) {
      returns.push(result[i].sickNm);
    }
    return returns;
  }
}
