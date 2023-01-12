import type { SearchResultType } from '../types/types';

interface CacheRepositoryInterface {
  saveCachedNotSearched(keyword: string): void;
  getCachedNotSearched(): string[];
  saveCachedSearched(SearchResult: SearchResultType): void;
  getCachedSearched(): string[];
}

export class CacheRepository implements CacheRepositoryInterface {
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

  saveCachedSearched(SearchResult: SearchResultType) {
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
