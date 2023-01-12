interface HttpClientInterface {
  fetch(keyword: string): Promise<JSON | Error>;
}

export class HttpClient implements HttpClientInterface {
  #baseURL;

  constructor(baseURL: string) {
    this.#baseURL = baseURL;
  }

  async fetch(keyword: string) {
    const keywordUTF = encodeURIComponent(keyword);

    try {
      const result = await window.fetch(`${this.#baseURL}/?q=` + keywordUTF);
      console.info(`검색어 '${keyword}' API 호출`);
      if (!result.ok) throw new Error();

      return result.json();
    } catch (error) {
      let errMessage = 'fethed Error!';

      if (error instanceof Error) errMessage = error.message;

      window.alert(errMessage);
    }
  }
}
