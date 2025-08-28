import { Product } from '@/lib/mocks';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='border border-gray-200 rounded-lg p-4'>
      <div className='relative aspect-video'>
        <Image
          src={product.image}
          alt={product.name}
          className='object-cover'
          fill
          loading='lazy'
          sizes='(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw, 
                 33vw'
        />
      </div>

      <h2 className='text-lg font-semibold'>
        {product.name}
      </h2>

      <p className='text-gray-600'>
        ${product.price.toFixed(2)}
      </p>

      <p className='text-gray-500'>
        {product.description}
      </p>
    </div>
  );
};

export default ProductCard;