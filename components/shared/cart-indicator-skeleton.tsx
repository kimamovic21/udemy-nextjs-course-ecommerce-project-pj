import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const CartIndicatorSkeleton = () => {
  return (
    <Button
      variant='ghost'
      size='icon'
      asChild
      className='relative animate-pulse'
      disabled
    >
      <Link href='/cart'>
        <ShoppingCart className='h-5 w-5' />
      </Link>
    </Button>
  );
};

export default CartIndicatorSkeleton;