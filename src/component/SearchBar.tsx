import React, { useCallback } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { searchInputState, searchBarFocus } from '../store/recoil_state';

import { MagnifyGlassThick, MagnifyGlassThin } from './MagnifyGlass';

const SearchBar = () => {
  const [, setSearchInput] = useRecoilState(searchInputState);
  const setIsSearchBarFocus = useSetRecoilState(searchBarFocus);

  const debounceFunction = (callback: any, delay: number) => {
    let timer: number | undefined;
    return (...args: any) => {
      // 실행한 함수(setTimeout())를 취소
      clearTimeout(timer);
      // delay가 지나면 callback 함수를 실행
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
      <h1 className="text-xl font-bold mb-5">국내 모든 임상시험 검색하고 온라인 참여하기</h1>
      <div className="flex items-center justify-between py-6 px-3 mb-3 rounded-3xl h-5 bg-white w-96">
        <div className="flex w-full">
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
