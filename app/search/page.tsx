import { Suspense } from 'react';
import { sleep } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import ProductCard from '../product-card';
import ProductsSkeleton from '../products-skeleton';
import Breadcrumbs from '@/components/shared/breadcrumbs';

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

const Products = async ({ query }: { query: string }) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 18,
  });

  await sleep(500);

  if (products.length === 0) {
    return (
      <div className='text-center text-muted-foreground'>
        No products found.
      </div>
    );
  };

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = params.query?.trim() ?? '';

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
    <main className='container mx-auto py-4'>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={query} fallback={<ProductsSkeleton />}>
        <Products query={query} />
      </Suspense>
    </main>
  );
};

export default SearchPage;