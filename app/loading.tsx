import ProductCardSkeleton from './product-card-skeleton';

const Loading = () => {
  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>
        Home
      </h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
};

export default Loading;