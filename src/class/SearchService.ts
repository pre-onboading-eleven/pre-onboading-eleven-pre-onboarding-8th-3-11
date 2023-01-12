import { HttpClient } from './HttpClient';
import { CacheRepository } from './CacheRepository';

import { CACHED_NOT_SEARCHED, CACHED_SEARCHED, NOT_CACHED } from '../constant/constants';

import type { SearchResultType, NoResultArray, ApiResponseType } from '../types/types';

interface SearchServiceInterface {
  checkCache(keyword: string): Promise<string>;
  getCacheSearched(keyword: string): SearchResultType;
  getServer(keyword: string): Promise<ApiResponseType[]>;
  setCacheNotSearched(keyword: string): void;
  setCacheSearched(SearchResult: SearchResultType): void;
  convertResult(ApiResponse: ApiResponseType[]): SearchResultType['values'];
}

export class SearchService implements SearchServiceInterface {
  #httpClient;
  #cacheRepository;
  #CACHED_NOT_SEARCHED = CACHED_NOT_SEARCHED;
  #CACHED_SEARCHED = CACHED_SEARCHED;
  #NOT_CACHED = NOT_CACHED;
  #CACHED_NOT_SEARCHED_ARRAY: NoResultArray = [];
  #CACHED_SEARCHED_ARRAY: SearchResultType[] = [];
  #MAX_LENGTH = 7;

  constructor(httpClient: HttpClient, cacheRepository: CacheRepository) {
    this.#httpClient = httpClient;
    this.#cacheRepository = cacheRepository;
  }

  checkCache(keyword = '') {
    if (keyword === '') return Promise.resolve(this.#CACHED_NOT_SEARCHED);

    this.#CACHED_NOT_SEARCHED_ARRAY = this.#cacheRepository.getCachedNotSearched();
    if (this.#CACHED_NOT_SEARCHED_ARRAY.includes(keyword)) {
      return Promise.resolve(this.#CACHED_NOT_SEARCHED);
    }

    this.#CACHED_SEARCHED_ARRAY = this.#cacheRepository.getCachedSearched();

    for (const searched of this.#CACHED_SEARCHED_ARRAY) {
      if (searched.letter === keyword) return Promise.resolve(this.#CACHED_SEARCHED);
    }

    return Promise.resolve(this.#NOT_CACHED);
  }

  getCacheSearched(keyword: string) {
    return this.#CACHED_SEARCHED_ARRAY.filter(searched => searched.letter === keyword)[0];
  }

  async getServer(keyword: string) {
    if (!keyword) return;
    return this.#httpClient.fetch(keyword);
  }

  setCacheNotSearched(keyword: string) {
    this.#cacheRepository.saveCachedNotSearched(keyword);
  }

  setCacheSearched(SearchResult: SearchResultType) {
    this.#cacheRepository.saveCachedSearched(SearchResult);
  }

  convertResult(ApiResponse: ApiResponseType[]) {
    const returns = [];
    ApiResponse.sort((a, b) => a.sickNm.length - b.sickNm.length);
    for (let i = 0; i < Math.min(ApiResponse.length, this.#MAX_LENGTH); i++) {
      returns.push(ApiResponse[i].sickNm);
    }
    return returns;
  }
}
