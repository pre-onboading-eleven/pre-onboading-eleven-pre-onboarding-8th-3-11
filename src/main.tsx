import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { RecoilRoot } from 'recoil';
import { HttpClient } from './httpClient/HttpClient';
import { SearchService } from './search/SearchService';
import { SearchProvider } from './context/SearchContext';
import { CacheRepository } from './repository/CacheRepository';

const cacheRepository = new CacheRepository();
const httpClient = new HttpClient('http://localhost:4000');
const searchService = new SearchService(httpClient, cacheRepository);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <SearchProvider searchService={searchService}>
        <App />
      </SearchProvider>
    </RecoilRoot>
  </React.StrictMode>
);
