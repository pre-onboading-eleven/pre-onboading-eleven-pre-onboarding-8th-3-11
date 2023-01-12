/**
 * CacheRepository Interface => 캐싱을 위한 인터페이스
 *
 * saveCachedNotSearched(keyword): void => 검색했는데 검색이 안 되는 단어를 저장하는 메소드
 * getCachedNotSearched(): CachedNotSearched => 검색이 안 되는 단어들을 불러와 배열로 리턴해주는 메소드
 * saveCachedSearched(SearchResult): void => 검색했는데 검색이 되는 단어를 저장하는 메소드.
 * getCachedSearched(): SearchResult => 검색이 되는 단어와 병명을 불러와 SearchResult로 리턴해주는 메소드
 */

import { SearchResult } from '../types/types';

export class CacheRepository {
  #CACHED_NOT_SEARCHED = 'not-exists';
  #CACHED_SEARCHED = 'exists';

  saveCachedNotSearched(keyword: string) {
    const notSearched = sessionStorage.getItem(this.#CACHED_NOT_SEARCHED);
    if (notSearched === null) {
      sessionStorage.setItem(this.#CACHED_NOT_SEARCHED, JSON.stringify([keyword]));
    } else {
      const notSearchedArray = JSON.parse(notSearched);
      if (notSearchedArray.includes(keyword)) return;
      sessionStorage.setItem(
        this.#CACHED_NOT_SEARCHED,
        JSON.stringify([...notSearchedArray, keyword])
      );
    }
  }

  getCachedNotSearched() {
    const notSearched = sessionStorage.getItem(this.#CACHED_NOT_SEARCHED);
    return notSearched === null ? [] : JSON.parse(notSearched);
  }

  saveCachedSearched(SearchResult: SearchResult) {
    const searched = sessionStorage.getItem(this.#CACHED_SEARCHED);
    if (searched === null) {
      sessionStorage.setItem(this.#CACHED_SEARCHED, JSON.stringify([SearchResult]));
    } else {
      const searchedArray = JSON.parse(searched);
      for (const obj of searchedArray) {
        if (obj.letter === SearchResult.letter) return;
      }
      sessionStorage.setItem(
        this.#CACHED_SEARCHED,
        JSON.stringify([...searchedArray, SearchResult])
      );
    }
  }

  getCachedSearched() {
    const searchedArray = sessionStorage.getItem(this.#CACHED_SEARCHED) || '';
    return searchedArray.length === 0 ? [] : JSON.parse(searchedArray);
  }
}
