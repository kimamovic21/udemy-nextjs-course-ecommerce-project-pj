import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import type { Product } from './generated/prisma';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className='pt-0 overflow-hidden min-h-[400px]'>
        <div className='relative aspect-video'>
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              className='object-cover'
              fill
              priority={true}
              sizes='(max-width: 768px) 100vw, 
                     (max-width: 1200px) 50vw, 
                     33vw'
            />
          )}
        </div>

        <CardHeader>
          <CardTitle>
            {product.name}
          </CardTitle>

          <CardDescription>
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <p>{formatPrice(product.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;