import React from 'react';
import { useRecoilValue } from 'recoil';
import { searchBarFocus } from '../recoil_state';

const AutocompleteBar = () => {
  const isSearchBarFocus = useRecoilValue(searchBarFocus);
  return (
    <div
      className="w-96 bg-white rounded-xl p-4"
      style={{ display: isSearchBarFocus ? 'block' : 'none' }}
    >
      <p>안뇽</p>
    </div>
  );
};

export default AutocompleteBar;
