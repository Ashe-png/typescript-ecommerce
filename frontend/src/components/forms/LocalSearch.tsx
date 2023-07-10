import React, { ChangeEvent } from 'react';

type Props = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

const LocalSearch = ({ keyword, setKeyword }: Props) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="flex h-9 w-full rounded-md border border-input bg-back px-3 py-2 text-sm max-w-[514px] inputshadow mb-3"
    />
  );
};

export default LocalSearch;
