import { useRecoilState, useRecoilValue } from 'recoil';
import { useSearch } from '../context/SearchContext';
import { searchBarFocus, searchInputState, searchSelectedState } from '../store/recoil_state';

import type { SearchResultType } from '../types/types';

const AutocompleteBar = () => {
  // Focus 여부 판별
  const isSearchBarFocus = useRecoilValue(searchBarFocus);

  // 검색어
  const searchInput = useRecoilValue(searchInputState);

  // 검색된 결과를 리턴해줌
  const searchResult: SearchResultType = useSearch();

  const [selected, setSelected] = useRecoilState(searchSelectedState);

  return (
    <div
      className="w-96 bg-white rounded-xl p-4"
      style={{ display: isSearchBarFocus ? 'block' : 'none' }}
    >
      <p className="font-bold mb-2">{searchInput}</p>
      <hr />
      {searchResult['values'].length === 0 ? (
        <p>검색결과가 없습니다</p>
      ) : (
        searchResult['values']?.map((item, idx) => (
          <p
            className={
              selected === idx
                ? 'flex bg-yellow-200 cursor-pointer p-1'
                : 'flex hover:bg-pink-200 cursor-pointer p-1'
            }
            key={idx}
          >
            {item.split(searchInput)[0]}
            <span className="font-bold">{searchInput}</span>
            {item.split(searchInput)[1]}
          </p>
        ))
      )}
    </div>
  );
};

export default AutocompleteBar;
