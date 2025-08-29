import { prisma } from '@/lib/prisma';
import ProductCard from './product-card';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const HomePage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams.page) || 1;
  const productsPerPage = 3;
  const itemsToSkip = (currentPage - 1) * productsPerPage;

  const products = await prisma.product.findMany({
    skip: itemsToSkip,
    take: productsPerPage,
    orderBy: { id: 'asc' },
  });

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
    </main>
  );
};

export default HomePage;