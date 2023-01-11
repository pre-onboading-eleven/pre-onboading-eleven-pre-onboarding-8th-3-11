import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { searchInputState, searchBarFocus } from '../recoil_state';

import { MagnifyGlassThick, MagnifyGlassThin } from './MagnifyGlass';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);
  const setIsSearchBarFocus = useSetRecoilState(searchBarFocus);

  const onInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-5">국내 모든 임상시험 검색하고 온라인 참여하기</h1>
      <div className="flex items-center justify-between py-6 px-3 mb-3 rounded-3xl h-5 bg-white w-96">
        <div className="flex w-full">
          <MagnifyGlassThin />
          <input
            type="text"
            placeholder="질환명을 입력해주세요"
            onFocus={() => setIsSearchBarFocus(true)}
            onBlur={() => setIsSearchBarFocus(false)}
            onChange={onInputText}
            className="w-full"
          />
        </div>
        <button className="rounded-full bg-blue-600 w-10 h-9 flex items-center">
          <MagnifyGlassThick />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
