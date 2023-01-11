// CacheRepository Interface
// saveNoResult(keyword): void
// getNoResult(): NoResultArray
// saveInResult(keyword[]): void
// getInResult(): SearchResult{}

import { SearchResult } from '../types/types';

export class CacheRepository {
  #NO_RESULT = 'no-result';
  #IN_RESULT = 'in-result';

  saveNoResult(keyword: string) {
    const noResult = sessionStorage.getItem(this.#NO_RESULT);
    if (noResult === null) {
      sessionStorage.setItem(this.#NO_RESULT, JSON.stringify([keyword]));
    } else {
      const noResultArray = JSON.parse(noResult);
      if (noResultArray.includes(keyword)) return;
      sessionStorage.setItem(this.#NO_RESULT, JSON.stringify([...noResultArray, keyword]));
    }
  }

  getNoResult() {
    const noResult = sessionStorage.getItem(this.#NO_RESULT);
    return noResult === null ? [] : JSON.parse(noResult);
  }

  saveInResult(result: SearchResult) {
    const inResult = sessionStorage.getItem(this.#IN_RESULT);
    if (inResult === null) {
      sessionStorage.setItem(this.#IN_RESULT, JSON.stringify([result]));
    } else {
      const inResultArray = JSON.parse(inResult);
      for (const obj of inResultArray) {
        if (obj.letter === result.letter) return;
      }
      sessionStorage.setItem(this.#IN_RESULT, JSON.stringify([...inResultArray, result]));
    }
  }

  getInResult() {
    const inResultArray = sessionStorage.getItem(this.#IN_RESULT) || '';
    return inResultArray.length === 0 ? [] : JSON.parse(inResultArray);
  }
}
