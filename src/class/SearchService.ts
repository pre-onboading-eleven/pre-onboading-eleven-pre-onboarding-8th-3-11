/**
 * SearchServiceInterface
 * 인터페이스는 SearchService 클래스에서 사용할 수 있는 메소드의 매개변수와 리턴값을 지정해 놓음
 * 메소드가 인터페이스에 맞춰서 만들어졌기 때문에 의존성 역전이 발생.(코드의 흐름은 인터페이스 => 메소드 순)
 *
 * 메소드(입력값): 리턴값으로 구성되어 있음
 * checkCache(keyword): Promise<string> => 검색어가 cache에 있는지 확인하여 결과를 Promise로 리턴
 * getCacheSearched(keyword): SearchResult => 검색결과가 있는 캐시를 가지고 와서 리턴
 * getServer(keyword): ApiResponse[] => 서버 호출하면 리턴되는 값
 * setCacheNotSearched(keyword):void => CacheRepository가 검색 안 된 캐시 저장하도록 하는 메소드
 * setCacheSearched(SearchResult): void => CacheRepository가 검색 된 캐시 저장하도록 하는 메소드
 * convertResult(ApiResponse): SearchResult['values'] => ApiResponse를 SearchResult에 맞게 변환. Max 7개
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

  setCacheSearched(SearchResult: SearchResult) {
    this.#cacheRepository.saveCachedSearched(SearchResult);
  }

  convertResult(ApiResponse: ApiResponse[]) {
    const returns = [];
    ApiResponse.sort((a, b) => a.sickNm.length - b.sickNm.length);
    for (let i = 0; i < Math.min(ApiResponse.length, this.#MAX_LENGTH); i++) {
      returns.push(ApiResponse[i].sickNm);
    }
    return returns;
  }
}
