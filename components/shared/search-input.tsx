import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

export function SearchInput() {
  return (
    <form className='relative w-full'>
      <SearchIcon className='absolute w-4 h-4 text-muted-foreground left-2.5 top-1/2 -translate-y-1/2' />
      <Input
        type='search'
        placeholder='Search'
        className='pl-8'
      />
    </form>
  );
};

export default SearchInput;