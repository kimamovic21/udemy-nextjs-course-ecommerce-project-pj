'use client';

import { Product } from '@/app/generated/prisma';
import ProductCard from '@/app/product-card';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
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

export default ProductList;