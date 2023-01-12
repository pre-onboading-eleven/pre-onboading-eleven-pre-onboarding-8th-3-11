import React from 'react';
import { useRecoilValue } from 'recoil';
import { searchBarFocus, searchInputState } from '../store/recoil_state';
import { useSearch } from '../context/SearchContext';

const AutocompleteBar = () => {
  const isSearchBarFocus = useRecoilValue(searchBarFocus);
  const searchInput = useRecoilValue(searchInputState);
  const searchResult = useSearch();

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