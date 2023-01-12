import React from 'react';
import { useRecoilValue } from 'recoil';
import { searchBarFocus, searchInputState } from '../store/recoil_state';
import { useSearch } from '../context/SearchContext';
import { SearchResult } from '../types/types';

const AutocompleteBar = () => {
  // Focus 여부 판별
  const isSearchBarFocus = useRecoilValue(searchBarFocus);

  // 검색어
  const searchInput = useRecoilValue(searchInputState);

  // 검색된 결과를 리턴해줌
  const searchResult: SearchResult = useSearch();

  return (
    <div
      className="w-96 bg-white rounded-xl p-4"
      style={{ display: isSearchBarFocus ? 'block' : 'none' }}
    >
      <p>{searchInput}</p>
      <hr />
      {searchResult['values'].length === 0 ? (
        <p>검색결과가 없습니다</p>
      ) : (
        searchResult['values']?.map((item, idx) => <p key={idx}>{item}</p>)
      )}
    </div>
  );
};

export default AutocompleteBar;
