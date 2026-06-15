import SearchIcon from '@/assets/icons/search.svg?react';

import type { SearchInputProps } from './SearchInput.type';

const SearchInput = ({ value, onChange, placeholder, onSearch }: SearchInputProps) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-brand-primary h-14 w-full rounded-full border-2 px-14 outline-none md:w-105"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch?.(value);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
