/**
 * HttpClientInterface => HTTP 통신을 위한 인터페이스
 *
 * fetch(keyword): Promise<Any> => API 호출하고 데이터를 리턴하는 메소드
 */

export class HttpClient {
  #baseURL;

  constructor(baseURL: string) {
    this.#baseURL = baseURL;
  }

  async fetch(keyword: string) {
    const keywordUTF = encodeURIComponent(keyword);
    const result = await window.fetch(`${this.#baseURL}/?q=` + keywordUTF);
    console.info(`검색어 '${keyword}' API 호출`);
    if (!result.ok) throw new Error();

    return result.json();
  }
}
