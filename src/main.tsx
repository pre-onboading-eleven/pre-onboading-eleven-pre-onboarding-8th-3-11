import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RecoilRoot } from 'recoil';
import { HttpClient } from './class/HttpClient';
import { SearchService } from './class/SearchService';
import { SearchProvider } from './context/SearchContext';
import { CacheRepository } from './class/CacheRepository';

const cacheRepository = new CacheRepository();
const httpClient = new HttpClient('http://localhost:4000/sick');
const searchService = new SearchService(httpClient, cacheRepository);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <SearchProvider searchService={searchService}>
      <App />
    </SearchProvider>
  </RecoilRoot>
);
