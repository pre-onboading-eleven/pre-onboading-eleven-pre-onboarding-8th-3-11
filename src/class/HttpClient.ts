/**
 * HttpClientInterface
 *
 * fetch(keyword): Promise<Any>
 */

export class HttpClient {
  #baseURL;

  constructor(baseURL: string) {
    this.#baseURL = baseURL;
  }

  async fetch(keyword: string) {
    const keywordUTF = encodeURIComponent(keyword);
    const result = await window.fetch(`${this.#baseURL}/?q=` + keywordUTF);
    console.info('API call');
    if (!result.ok) throw new Error();

    return result.json();
  }
}
