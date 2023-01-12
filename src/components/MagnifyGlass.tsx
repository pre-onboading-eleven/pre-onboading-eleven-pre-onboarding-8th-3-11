import { useRecoilValue } from 'recoil';
import { searchBarFocus } from '../store/recoil_state';

const MagnifyGlassThin = () => {
  const isSearchBarFocus = useRecoilValue(searchBarFocus);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      className="w-6 h-6 mr-3"
      style={{ display: isSearchBarFocus ? 'none' : 'block' }}
    >
      <path
        stroke="rgb(163 163 163)"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};

const MagnifyGlassThick = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 m-auto"
    >
      <path
        stroke="rgb(255 255 255)"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};

export { MagnifyGlassThin, MagnifyGlassThick };
