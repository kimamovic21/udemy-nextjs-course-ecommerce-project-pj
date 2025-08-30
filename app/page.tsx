import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { sleep } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import ProductCard from './product-card';
import ProductsSkeleton from './products-skeleton';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Products = async ({ currentPage }: { currentPage: number }) => {
  const productsPerPage = 3;

  const itemsToSkip = (currentPage - 1) * productsPerPage;

  const products = await prisma.product.findMany({
    skip: itemsToSkip,
    take: productsPerPage,
  });

  await sleep(500);

  return (
    <>
      <p>
        Showing {products.length} products
      </p>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

const HomePage = async (props: { searchParams: SearchParams }) => {
  const productsPerPage = 3;

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>
        Home
      </h1>

      <Suspense key={currentPage} fallback={<ProductsSkeleton />}>
        <Products currentPage={currentPage} />
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
                className={currentPage === index + 1 ? 'active' : ''}
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