import { FC } from 'react';
import { ReactComponent as SearchIcon } from 'assets/svgAsIcons/search-icon.svg';

const SearchForm: FC = () => {
  return (
    <form className="flex items-center">
      <div className="relative">
        <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none`}>
          <SearchIcon />
        </div>
        <input
          type="text"
          id="simple-search"
          className="search rounded-[10px] focus:ring-[#dee0e9] focus:border-[#dee0e9] block w-full pl-10 p-2.5 bg-white"
          placeholder="Search"
          required
        />
      </div>
    </form>
  );
};

export default SearchForm;
