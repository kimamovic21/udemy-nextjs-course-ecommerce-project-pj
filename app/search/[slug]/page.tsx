import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import ProductCard from '@/app/product-card';
import ProductsSkeleton from '@/app/products-skeleton';
import Breadcrumbs from '@/components/shared/breadcrumbs';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const Products = async ({ slug }: { slug: string }) => {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    take: 18,
  });

  await sleep(1000);

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

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    notFound();
  };

  const breadcrumbs = [
    { label: 'Products', href: '/' },
    {
      label: category.name,
      href: `/search/${category.slug}`,
    },
  ];

  return (
    <main className='container mx-auto py-4'>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={slug} fallback={<ProductsSkeleton />}>
        <Products slug={slug} />
      </Suspense>
    </main>
  );
};

export default CategoryPage;