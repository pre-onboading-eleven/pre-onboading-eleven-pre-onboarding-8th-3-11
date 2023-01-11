import AutocompleteBar from './component/AutocompleteBar';
import SearchBar from './component/SearchBar';

function App() {
  return (
    <div className="bg-cyan-100 w-full h-full pt-52">
      <div className="flex flex-col justify-center items-center">
        <SearchBar />
        <AutocompleteBar />
      </div>
    </div>
  );
}

export default App;
