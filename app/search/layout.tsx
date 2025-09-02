import { Suspense } from 'react';
import CategorySidebar from '@/components/shared/category-sidebar';

const SearchLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className='container mx-auto p-4'>
      <div className='flex gap-8'>
        <div className='w-[125px] flex-none'>
          Categories
          <Suspense fallback={
            <div className='w-[125px]'>
              Loading...
            </div>
          }>
            <CategorySidebar />
          </Suspense>
        </div>
        <div className='flex-1'>
          {children}
        </div>
        <div className='w-[125px] flex-none'>
          Sorting
        </div>
      </div>
    </main>
  );
};

export default SearchLayout;