import { Suspense } from 'react';
import ProductsSkeleton from '../products-skeleton';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ProductListServerWrapper from '@/components/shared/product-list-server-wrapper';

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = params.query?.trim() ?? '';
  const sort = params.sort;

  const breadcrumbs = [
    {
      label: 'Products',
      href: '/',
    },
    {
      label: `Results for '${query}'`,
      href: `/search?query=${encodeURIComponent(query)}`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense
        key={`${query}-${sort}`}
        fallback={<ProductsSkeleton />}
      >
        <ProductListServerWrapper
          query={query}
          sort={sort}
        />
      </Suspense>
    </>
  );
};

export default SearchPage;