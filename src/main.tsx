import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RecoilRoot } from 'recoil';
import { HttpClient } from './class/HttpClient';
import { SearchService } from './class/SearchService';
import { SearchProvider } from './context/SearchContext';
import { CacheRepository } from './class/CacheRepository';

// SearchService cacheRepository, httpClient 주입 = SearchService에서 CacheRepository와 HttpClient를 쓸 수 있게 만듦.
// SearchService가 검색을 위한 메소드를 정의한 클래스.
const cacheRepository = new CacheRepository();
const httpClient = new HttpClient('http://localhost:4000/sick');
const searchService = new SearchService(httpClient, cacheRepository);

// SearchProvider로 <App />에서 SearchService를 사용할 수 있도록 함.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <SearchProvider searchService={searchService}>
      <App />
    </SearchProvider>
  </RecoilRoot>
);
