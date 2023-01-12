/**
 * SearchServiceInterface
 *
 * checkCache(keyword): Promise<string>
 * getCache(keyword): SearchResult[]
 * getServer(keyword): SearchResult[]
 * setCacheNoResult(keyword):void
 * setCacheInResult(SearchResult): void
 * convertResult(ApiResponse): SearchResult['values']
 */

import { SearchResult, NoResultArray, ApiResponse } from '../types/types';
import { CACHED_NOT_SEARCHED, CACHED_SEARCHED, NOT_CACHED } from '../constant/constants';
import { HttpClient } from './HttpClient';
import { CacheRepository } from './CacheRepository';

export class SearchService {
  #httpClient;
  #cacheRepository;
  #CACHED_NOT_SEARCHED = CACHED_NOT_SEARCHED;
  #CACHED_SEARCHED = CACHED_SEARCHED;
  #NOT_CACHED = NOT_CACHED;
  #CACHED_NOT_SEARCHED_ARRAY: NoResultArray = [];
  #CACHED_SEARCHED_ARRAY: SearchResult[] = [];
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

  getCache(keyword: string) {
    return this.#CACHED_SEARCHED_ARRAY.filter(searched => searched.letter === keyword);
  }

  async getServer(keyword: string) {
    if (!keyword) return;
    return this.#httpClient.fetch(keyword);
  }

  setCacheNoResult(keyword: string) {
    this.#cacheRepository.saveCachedNotSearched(keyword);
  }

  setCacheInResult(SearchResult: SearchResult) {
    this.#cacheRepository.saveCachedSearched(SearchResult);
  }

  convertResult(ApiResponse: ApiResponse[]) {
    // sickNm 짧은 순서대로 정렬해서 7개까지 리턴
    const returns = [];
    ApiResponse.sort((a, b) => a.sickNm.length - b.sickNm.length);
    for (let i = 0; i < Math.min(ApiResponse.length, this.#MAX_LENGTH); i++) {
      returns.push(ApiResponse[i].sickNm);
    }
    return returns;
  }
}
