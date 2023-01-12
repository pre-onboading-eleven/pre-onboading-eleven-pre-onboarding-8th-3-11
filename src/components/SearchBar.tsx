import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { MagnifyGlassThin } from './MagnifyGlass';

import { searchBarFocus, searchInputState, searchSelectedNumState } from '../store/recoil_state';
import { useSearch } from '../context/SearchContext';

import { debounceFunction } from '../lib/debounce';

import type { SearchResultType } from '../types/types';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const [selectedNum, setSelectedNum] = useRecoilState(searchSelectedNumState);
  const [_, setSearchInput] = useRecoilState(searchInputState);
  const setIsSearchBarFocus = useSetRecoilState(searchBarFocus);

  const searchResult: SearchResultType = useSearch();

  const apiCall = useCallback(
    debounceFunction((value: string) => setSearchInput(value), 500),
    []
  );

  const onTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chagedValue = e.target.value;

    setInputValue(chagedValue);
    setSelectedNum(-1);
    apiCall(chagedValue.trim());
    setIsSearchBarFocus(true);
  };

  const onTextKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.nativeEvent.isComposing) return;

    if (inputValue.length > 0) {
      if (event.code === 'ArrowDown' && selectedNum < 6) {
        setSelectedNum(prevState => prevState + 1);
      } else if (event.code === 'ArrowUp' && 0 < selectedNum) {
        setSelectedNum(prevState => prevState - 1);
      } else if (event.code === 'Enter' && 0 <= selectedNum && selectedNum <= 6) {
        setInputValue(searchResult.values[selectedNum]);
        setIsSearchBarFocus(false);
        setSelectedNum(-1);
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

  const onSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="text-4xl grid place-items-center leading-normal font-bold mb-8">
        <h2 className="text-center whitespace-pre-wrap">{`국내 모든 임상시험 검색하고 \n 온라인으로 참여하기`}</h2>
      </div>
      <form
        autoComplete="off"
        noValidate
        onSubmit={onSubmitButton}
        className="flex items-center justify-between py-6 pl-3 m-3 rounded-3xl h-5 bg-white w-96"
      >
        <div className=" box-border flex rounded-3xl overflow-hidden ">
          <MagnifyGlassThin />
          <input
            formNoValidate
            value={inputValue}
            placeholder="질환명을 입력해주세요"
            className="w-full w-60 pl-2 outline-transparent"
            onKeyDown={onTextKeyDown}
            onChange={onTextInput}
            onFocus={onTextFocus}
            onBlur={onTextBlur}
          />
        </div>
        <button className="bg-[#1da1f2] w-20 h-12 rounded-r-full text-white">검색</button>
      </form>
    </section>
  );
};

export default SearchBar;
