import React from 'react';
import { useRecoilValue } from 'recoil';
import { searchBarFocus, searchInputState } from '../recoil_state';
import { useSearch } from '../context/SearchContext';

const AutocompleteBar = () => {
  const isSearchBarFocus = useRecoilValue(searchBarFocus);
  const searchInput = useRecoilValue(searchInputState);
  const searchResult = useSearch();
  console.info(searchResult[0]);

  return (
    <div
      className="w-96 bg-white rounded-xl p-4"
      // style={{ display: isSearchBarFocus ? 'block' : 'none' }}
      style={{ display: isSearchBarFocus ? 'block' : 'block' }}
    >
      <p>{searchInput}</p>
      {searchResult[0] !== undefined && searchResult[0].hasOwnProperty('values')
        ? searchResult[0]['values']?.map((item, idx) => <p key={idx}>{item}</p>)
        : null}
    </div>
  );
};

export default AutocompleteBar;
