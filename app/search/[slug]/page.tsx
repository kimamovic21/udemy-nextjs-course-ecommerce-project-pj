import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductsSkeleton from '@/app/products-skeleton';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ProductListServerWrapper from '@/components/shared/product-list-server-wrapper';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

const CategoryPage = async ({
  params,
  searchParams,
}: CategoryPageProps) => {
  const { slug } = await params;
  const { sort } = await searchParams;

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
    {
      label: 'Products',
      href: '/'
    },
    {
      label: category.name,
      href: `/search/${category.slug}`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense
        key={`${slug}-${sort}`}
        fallback={<ProductsSkeleton />}
      >
        <ProductListServerWrapper slug={slug} sort={sort} />
      </Suspense>
    </>
  );
};

export default CategoryPage;