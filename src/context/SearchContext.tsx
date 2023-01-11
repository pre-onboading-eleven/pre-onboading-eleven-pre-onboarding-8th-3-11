import React, { useContext, createContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchInputState, searchOutputState } from '../store/recoil_state';
import { SearchResult } from '../types/types';
import { NO_RESULT, IN_RESULT, NEW_RESULT } from '../constant/constants';

const SearchContext = createContext<SearchResult>({ letter: '', values: [] });

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({
  children,
  searchService,
}: {
  children: React.ReactNode;
  searchService: any;
}) => {
  const searchInput = useRecoilValue(searchInputState);
  const [searchOutput, setSearchOutput] = useRecoilState(searchOutputState);

  useEffect(() => {
    // 비즈니스 로직 처리
    searchService.checkCache(searchInput).then((cached: string) => {
      if (cached === NO_RESULT) {
        setSearchOutput({ letter: searchInput, values: [] });
      } else if (cached === IN_RESULT) {
        setSearchOutput(searchService.getCache(searchInput)[0]);
      } else {
        searchService.getServer(searchInput).then((res: any) => {
          setSearchOutput(res);
        });
      }
    });
  }, [searchInput]);

  return <SearchContext.Provider value={searchOutput}>{children}</SearchContext.Provider>;
};
