'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/use-cart';
import { Button } from '../ui/button';
import Link from 'next/link';

const CartButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant='ghost' size='icon' asChild className='relative'>
      <Link href='/cart'>
        {children}
      </Link>
    </Button>
  );
};

const CartIndicator = () => {
  const { itemCount, isLoading } = useCart();

  if (isLoading) {
    return (
      <CartButton>
        <ShoppingCart className='h-5 w-5' />
      </CartButton>
    );
  };

  return (
    <CartButton>
      <ShoppingCart className='h-5 w-5' />
      {itemCount > 0 && (
        <span className='absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
          {itemCount}
        </span>
      )}
    </CartButton>
  );
};

export default CartIndicator;