import { atom } from 'recoil';
import { SearchResult } from '../types/types';

const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

const searchResultState = atom<SearchResult[]>({
  key: 'searchResultState',
  default: [],
});

const searchOutputState = atom<SearchResult>({
  key: 'searchOutputState',
  default: { letter: '', values: [] },
});

const searchBarFocus = atom({
  key: 'searchBarFocus',
  default: false,
});

export { searchInputState, searchBarFocus, searchResultState, searchOutputState };
