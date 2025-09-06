'use server';

import { getCart } from './actions';

export async function createOrder() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  };

  // TODO:
  // 1. Calculate total price
  // 2. Create Order record
  // 3. Create OrderItem records
  // 4. Clear cart
  // 5. Revalidate cache
  // 6. Return the order
};