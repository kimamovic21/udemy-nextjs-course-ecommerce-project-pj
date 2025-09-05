import { ShoppingCart } from 'lucide-react';
import { getCart } from '@/lib/actions';
import { Button } from '../ui/button';
import Link from 'next/link';

const CartIndicator = async () => {
  const cart = await getCart();
  const cartSize = cart?.size ?? 0;

  return (
    <Button variant='ghost' size='icon' asChild className='relative'>
      <Link href='/cart'>
        <ShoppingCart className='h-5 w-5' />
        {cartSize > 0 && (
          <span className='absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
            {cartSize}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartIndicator;