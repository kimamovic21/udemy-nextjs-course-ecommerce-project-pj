import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import CategorySidebar from '@/components/shared/category-sidebar';
import SortingControls from '@/components/shared/sorting-controls';

const CategorySidebarServerWrapper = async () => {
  const categories = await unstable_cache(
    () => {
      return prisma.category.findMany({
        select: {
          name: true,
          slug: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    },
    ['categories'],
    {
      tags: ['categories'],
      revalidate: 3600,
    }
  )();
  return (
    <CategorySidebar categories={categories} />
  );
};

const SearchLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className='container mx-auto p-4'>
      <div className='flex gap-8'>
        <div className='w-[125px] flex-none'>
          <Suspense
            fallback={
              <div className='w-[125px]'>
                Loading...
              </div>
            }>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>

        <div className='flex-1'>
          {children}
        </div>

        <div className='w-[125px] flex-none'>
          <SortingControls />
        </div>
      </div>
    </main>
  );
};

export default SearchLayout;