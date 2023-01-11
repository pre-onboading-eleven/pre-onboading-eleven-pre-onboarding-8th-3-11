// CacheRepository Interface
// saveNoResult(keyword): void
// getNoResult(): NoResultArray
// saveInResult(keyword[]): void
// getInResult(): SearchResult[]
import { SearchResult } from '../types';

export class CacheRepository {
  #NO_RESULT = 'no-result';
  #IN_RESULT = 'in-result';

  saveNoResult(keyword: string) {
    const cachedNoResult = JSON.parse(sessionStorage.getItem(this.#NO_RESULT) ?? '');
    sessionStorage.setItem(this.#NO_RESULT, JSON.stringify([...cachedNoResult, keyword]));
  }

  getNoResult() {
    const noResultArray = sessionStorage.getItem(this.#NO_RESULT);
    return noResultArray === null ? [] : noResultArray.split(',');
  }

  saveInResult(keyword: string, result: SearchResult[]) {
    const cachedInResult = JSON.parse(sessionStorage.getItem(this.#IN_RESULT) ?? '');
    const newObject: { [key: string]: SearchResult[] } = {};
    newObject[keyword] = result;
    cachedInResult.push(newObject);

    sessionStorage.setItem(this.#IN_RESULT, JSON.stringify(cachedInResult));
  }

  getInResult() {
    const inResultArray = sessionStorage.getItem(this.#IN_RESULT) || '';
    return inResultArray.length === 0 ? [] : JSON.parse(inResultArray);
  }
}
