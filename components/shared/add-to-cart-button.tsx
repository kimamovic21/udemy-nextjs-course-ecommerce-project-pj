'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '@/lib/actions';
import { useCart } from '@/lib/use-cart';
import type { Product } from '@/app/generated/prisma';
import { Button } from '@/components/ui/button';

const AddToCartButton = ({
  product
}: {
  product: Product
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const { revalidateCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
      revalidateCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    };
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.inventory === 0 || isAdding}
      className='w-full cursor-pointer'
    >
      <ShoppingCart className='mr-1 w-4 h-4' />
      {product.inventory > 0 ? 'Add to cart' : 'Out of stock'}
    </Button>
  );
};

export default AddToCartButton;