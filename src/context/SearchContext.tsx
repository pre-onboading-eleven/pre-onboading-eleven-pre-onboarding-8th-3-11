import React, { useContext, createContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchInputState, searchResultState } from '../recoil_state';
import { SearchResult } from '../types';

const SearchContext = createContext<SearchResult[]>([]);

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({
  children,
  searchService,
}: {
  children: React.ReactNode;
  searchService: any;
}) => {
  const searchInput = useRecoilValue(searchInputState);
  const [searchResult, setSearchResult] = useRecoilState(searchResultState);

  useEffect(() => {
    // 비즈니스 로직 처리
    searchService.checkCache(searchInput).then((res: any) => {
      console.info(res);
      // if (cached) {
      //   //
      // } else {
      //   searchService.getServer(searchInput).then((res: any) => {
      //     setSearchResult(res);
      //   });
      // }
    });
    // const result = searchService.checkCache(searchInput);
    // console.info(result);
  }, [searchService, searchInput]);

  return <SearchContext.Provider value={searchResult}>{children}</SearchContext.Provider>;
};
