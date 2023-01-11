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

  /**
   * 캐시 기능 로직
   * sessionStorage에 정보가 없는 값(NO_RESULT), 정보가 있는 값(IN_RESULT)로
   * 구분해서, 있으면 API call을 안 하고 넘어감.
   * 정보가 있는 값의 경우 최대 7개까지만 저장.
   */
  useEffect(() => {
    searchService.checkCache(searchInput).then((cached: string) => {
      // console.info(cached);
      if (cached === NO_RESULT) {
        setSearchOutput({ letter: searchInput, values: [] });
      } else if (cached === IN_RESULT) {
        setSearchOutput(searchService.getCache(searchInput)[0]);
      } else {
        searchService.getServer(searchInput).then((res: any) => {
          if (res.length === 0) {
            searchService.setCacheNoResult(searchInput);
            setSearchOutput({ letter: searchInput, values: [] });
          } else {
            const result: SearchResult = {
              letter: searchInput,
              values: searchService.convertResult(res),
            };
            searchService.setCacheInResult(result);
            setSearchOutput(result);
          }
        });
      }
    });
  }, [searchInput]);

  return <SearchContext.Provider value={searchOutput}>{children}</SearchContext.Provider>;
};
