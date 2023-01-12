import { atom } from 'recoil';
import { SearchResult } from '../types/types';
import { DEFAULT_SEARCH_RESULT } from '../constant/constants';

const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

const searchSelectedState = atom({
  key: 'searchSelectedState',
  default: -1,
});

const searchResultState = atom<SearchResult[]>({
  key: 'searchResultState',
  default: [],
});

const showOutputState = atom<SearchResult>({
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
  searchSelectedState,
};
