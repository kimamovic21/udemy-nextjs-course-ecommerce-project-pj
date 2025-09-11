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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
    return {};
  };

  return {
    title: category.name,
    openGraph: {
      title: category.name,
    },
  };
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
      label: 'Search',
      href: '/search'
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