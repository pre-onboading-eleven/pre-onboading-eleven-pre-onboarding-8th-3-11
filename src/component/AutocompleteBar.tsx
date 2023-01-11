import React from 'react';
import { useRecoilValue } from 'recoil';
import { searchBarFocus, searchInputState } from '../recoil_state';
import { useSearch } from '../context/SearchContext';

const AutocompleteBar = () => {
  const isSearchBarFocus = useRecoilValue(searchBarFocus);
  const searchInput = useRecoilValue(searchInputState);
  const searchResult = useSearch();
  // console.info(searchResult);

  return (
    <div
      className="w-96 bg-white rounded-xl p-4"
      style={{ display: isSearchBarFocus ? 'block' : 'none' }}
    >
      <p>{searchInput}</p>
      {searchResult?.map((item, idx) => (
        <p key={idx}>{item.searchInput}</p>
      ))}
    </div>
  );
};

export default AutocompleteBar;
