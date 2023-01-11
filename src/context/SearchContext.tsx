import React, { useContext, createContext, useEffect } from 'react';
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
    searchService.get(searchInput).then(setSearchResult);
  }, [searchService, searchInput]);

  return <SearchContext.Provider value={searchResult}>{children}</SearchContext.Provider>;
};
