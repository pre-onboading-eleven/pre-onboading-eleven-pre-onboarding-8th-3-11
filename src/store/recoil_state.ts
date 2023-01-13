import { atom } from 'recoil';

import { DEFAULT_SEARCH_RESULT } from '../constant/constants';

import type { SearchResultType } from '../types/types';

const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

const searchSelectedNumState = atom({
  key: 'searchSelectedNumState',
  default: -1,
});

const searchResultState = atom<SearchResultType[]>({
  key: 'searchResultState',
  default: [],
});

const showOutputState = atom<SearchResultType>({
  key: 'showOutputState',
  default: DEFAULT_SEARCH_RESULT,
});

const searchBarFocus = atom({
  key: 'searchBarFocus',
  default: false,
});

export {
  searchInputState,
  searchBarFocus,
  searchResultState,
  showOutputState,
  searchSelectedNumState,
};
