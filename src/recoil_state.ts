import { atom, selector } from 'recoil';

type SearchResult = {
  text: string;
};

const searchInputState = atom({
  key: 'searchInputState',
  default: '',
});

const searchResultState = atom<SearchResult[]>({
  key: 'searchResultState',
  default: [],
});

const searchBarFocus = atom({
  key: 'searchBarFocus',
  default: false,
});

export { searchInputState, searchBarFocus, searchResultState };
