import React, { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchBarFocus, searchInputState } from '../store/recoil_state';

import { MagnifyGlassThick, MagnifyGlassThin } from './MagnifyGlass';

const SearchBar = () => {
  const [, setSearchInput] = useRecoilState(searchInputState);
  const setIsSearchBarFocus = useSetRecoilState(searchBarFocus);

  const debounceFunction = (callback: any, delay: number) => {
    let timer: number | undefined;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const apiCall = useCallback(
    debounceFunction((value: string) => setSearchInput(value), 500),
    []
  );

  const onTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    apiCall(e.target.value);
  };

  return (
    <>
      <div className="text-4xl grid place-items-center leading-normal font-bold mb-8">
        <h2>국내 모든 임상시험 검색하고</h2>
        <h2> 온라인으로 참여하기</h2>
      </div>
      <div className="flex items-center justify-between py-6 pl-3 mb-3 rounded-3xl h-5 bg-white w-96">
        <div className=" box-border flex rounded-3xl overflow-hidden ">
          <MagnifyGlassThin />
          <input
            type="text"
            placeholder="질환명을 입력해주세요"
            onFocus={() => {
              setIsSearchBarFocus(true);
              setSearchInput('');
            }}
            onBlur={() => setIsSearchBarFocus(false)}
            onChange={onTextInput}
            className="w-full w-60 pl-2 outline-transparent"
          />
        </div>
        <button className="bg-[#1da1f2] w-20 h-12 rounded-r-full text-white">검색</button>
      </div>
    </>
  );
};

export default SearchBar;
