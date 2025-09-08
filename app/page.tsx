import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import ProductsSkeleton from './products-skeleton';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ProductListServerWrapper from '@/components/shared/product-list-server-wrapper';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const HomePage = async (props: { searchParams: SearchParams }) => {
  const productsPerPage = 3;

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <main className='container mx-auto p-4'>
      <Breadcrumbs items={[{ label: 'Search', href: '/search' }]} />

      <Suspense key={currentPage} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper
          currentPage={currentPage}
          productsPerPage={productsPerPage}
        />
      </Suspense>

      <Pagination className='mt-8'>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious href={`?page=${currentPage - 1}`} />
            ) : (
              <span className='opacity-50 cursor-not-allowed px-3 py-2'>
                Previous
              </span>
            )}
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext href={`?page=${currentPage + 1}`} />
            ) : (
              <span className='opacity-50 cursor-not-allowed px-3 py-2'>
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default HomePage;