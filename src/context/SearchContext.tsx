import { useContext, createContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchInputState, showOutputState } from '../store/recoil_state';
import {
  CACHED_NOT_SEARCHED,
  CACHED_SEARCHED,
  NOT_CACHED,
  DEFAULT_SEARCH_RESULT,
} from '../constant/constants';
import { SearchService } from '../class/SearchService';

import type { SearchResultType, ApiResponseType } from '../types/types';

const SearchContext = createContext<SearchResultType>(DEFAULT_SEARCH_RESULT);

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
      searchService.getServer(searchInput).then((ApiResponse: ApiResponseType[]) => {
        if (ApiResponse.length === 0) {
          searchService.setCacheNotSearched(searchInput);
          setShowOutput(DEFAULT_SEARCH_RESULT);
        } else {
          const result: SearchResultType = {
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
