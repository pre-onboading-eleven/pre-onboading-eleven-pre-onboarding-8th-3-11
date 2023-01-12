import React, { useContext, createContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchInputState, showOutputState } from '../store/recoil_state';
import { SearchResult, ApiResponse } from '../types/types';
import {
  CACHED_NOT_SEARCHED,
  CACHED_SEARCHED,
  NOT_CACHED,
  DEFAULT_SEARCH_RESULT,
} from '../constant/constants';
import { SearchService } from '../class/SearchService';

const SearchContext = createContext<SearchResult>(DEFAULT_SEARCH_RESULT);

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({
  children,
  searchService,
}: {
  children: React.ReactNode;
  searchService: SearchService;
}) => {
  const searchInput = useRecoilValue(searchInputState);
  const [showOutput, setShowOutput] = useRecoilState(showOutputState);

  // 캐시 로직
  useEffect(() => {
    searchService.checkCache(searchInput).then((cachedType: string) => {
      switch (cachedType) {
        case CACHED_NOT_SEARCHED:
          setShowOutput(DEFAULT_SEARCH_RESULT);
          break;
        case CACHED_SEARCHED:
          setShowOutput(searchService.getCacheSearched(searchInput));
          break;
        case NOT_CACHED:
          getFromServer();
          break;
      }
    });

    const getFromServer = () => {
      searchService.getServer(searchInput).then((ApiResponse: ApiResponse[]) => {
        if (ApiResponse.length === 0) {
          searchService.setCacheNotSearched(searchInput);
          setShowOutput(DEFAULT_SEARCH_RESULT);
        } else {
          const result: SearchResult = {
            letter: searchInput,
            values: searchService.convertResult(ApiResponse),
          };

          searchService.setCacheSearched(result);
          setShowOutput(result);
        }
      });
    };
  }, [searchInput]);

  return <SearchContext.Provider value={showOutput}>{children}</SearchContext.Provider>;
};
