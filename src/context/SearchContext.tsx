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

  /**
   * 캐시 기능 로직
   * sessionStorage에 정보가 없는 값(CACHED_NOT_SEARCHED), 정보가 있는 값(CACHED_SEARCHED)로
   * 구분해서, 있으면 API call을 안 하고 넘어감.
   * 정보가 있는 값의 경우 최대 7개까지만 저장.
   */
  useEffect(() => {
    searchService.checkCache(searchInput).then((cachedType: string) => {
      switch (cachedType) {
        case CACHED_NOT_SEARCHED:
          setShowOutput(DEFAULT_SEARCH_RESULT);
          break;
        case CACHED_SEARCHED:
          setShowOutput(searchService.getCache(searchInput)[0]);
          break;
        case NOT_CACHED:
          getFromServer();
          break;
      }
    });

    const getFromServer = () => {
      searchService.getServer(searchInput).then((ApiResponse: ApiResponse[]) => {
        if (ApiResponse.length === 0) {
          searchService.setCacheNoResult(searchInput);
          setShowOutput(DEFAULT_SEARCH_RESULT);
        } else {
          const result: SearchResult = {
            letter: searchInput,
            values: searchService.convertResult(ApiResponse),
          };

          searchService.setCacheInResult(result);
          setShowOutput(result);
        }
      });
    };
  }, [searchInput]);

  return <SearchContext.Provider value={showOutput}>{children}</SearchContext.Provider>;
};
