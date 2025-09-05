import { Minus, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { CartItemWithProduct } from '@/lib/types';
import { Button } from '../ui/button';
import Image from 'next/image';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
};

const CartEntry = ({ cartItem }: CartEntryProps) => {
  return (
    <li className='border-b border-muted flex p-4 justify-between'>
      <div className='flex space-x-4'>
        <div className='overflow-hidden rounded-md border border-muted w-16 h-16'>
          <Image
            className='h-full w-full object-cover'
            width={128}
            height={128}
            src={cartItem?.product?.image ?? ''}
            alt={cartItem?.product?.name}
            unoptimized={true}
            priority={true}
          />
        </div>

        <div className='flex flex-col'>
          <div className='font-medium'>
            {cartItem.product.name}
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between items-end gap-2'>
        <p className='font-medium'>
          {formatPrice(cartItem.product.price)}
        </p>

        <div className='flex items-center border border-muted rounded-full'>
          <Button variant='ghost' className='rounded-l-full cursor-p'>
            <Minus className='h-4 w-4' />
          </Button>

          <p className='w-6 text-center'>
            {cartItem.quantity}
          </p>

          <Button variant='ghost' className='rounded-r-full cursor-pointer'>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartEntry;