import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { searchBarFocus, searchInputState, searchSelectedState } from '../store/recoil_state';
import { MagnifyGlassThin } from './MagnifyGlass';
import { useSearch } from '../context/SearchContext';

import { debounceFunction } from '../lib/debounce';

import type { SearchResultType } from '../types/types';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const [selected, setSelected] = useRecoilState(searchSelectedState);
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);
  const setIsSearchBarFocus = useSetRecoilState(searchBarFocus);

  const searchResult: SearchResultType = useSearch();

  const apiCall = useCallback(
    debounceFunction((value: string) => setSearchInput(value), 500),
    []
  );

  const onTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected(-1);
    apiCall(e.target.value);
    setIsSearchBarFocus(true);
  };

  const onTextKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.nativeEvent.isComposing) return;

    if (searchInput.length > 0) {
      if (event.code === 'ArrowDown') {
        setSelected(prevState => prevState + 1);
      } else if (event.code === 'ArrowUp') {
        setSelected(prevState => prevState - 1);
      } else if (event.code === 'Enter') {
        setInputValue(searchResult.values[selected]);
        setIsSearchBarFocus(false);
        setSelected(-1);
      }
    }
  };

  const onTextFocus = () => {
    setIsSearchBarFocus(true);
    setSearchInput('');
  };

  const onTextBlur = () => {
    setIsSearchBarFocus(false);
  };

  return (
    <>
      <div className="text-4xl grid place-items-center leading-normal font-bold mb-8">
        <h2 className="text-center whitespace-pre-wrap">{`국내 모든 임상시험 검색하고 \n 온라인으로 참여하기`}</h2>
      </div>
      <div className="flex items-center justify-between py-6 pl-3 mb-3 rounded-3xl h-5 bg-white w-96">
        <div className=" box-border flex rounded-3xl overflow-hidden ">
          <MagnifyGlassThin />
          <input
            value={inputValue}
            onKeyDown={onTextKeyUp}
            type="text"
            placeholder="질환명을 입력해주세요"
            onFocus={onTextFocus}
            onBlur={onTextBlur}
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
