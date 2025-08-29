import { prisma } from '@/lib/prisma';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import ProductCard from './product-card';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const HomePage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams.page) || 1;
  const productsPerPage = 3;
  const itemsToSkip = (currentPage - 1) * productsPerPage;

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      skip: itemsToSkip,
      take: productsPerPage,
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>
        Home
      </h1>

      <p>
        Showing {products.length} products
      </p>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

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