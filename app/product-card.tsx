import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Product } from './generated/prisma';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='relative aspect-video'>
        {product.image && (
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
        <p>
          {formatPrice(product.price)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;