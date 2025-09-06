'use server';

import { cookies } from 'next/headers';
import { getCart } from './actions';
import { prisma } from './prisma';

export async function createOrder() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  };

  try {
    const order = await prisma.$transaction(async (tx) => {
      const total = cart.subtotal;

      const newOrder = await tx.order.create({
        data: {
          total,
        },
      });

      const orderItems = cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        orderId: newOrder.id,
        price: item.product.price,
      }));

      await tx.orderItem.createMany({
        data: orderItems,
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });

      return newOrder;
    });

    (await cookies()).delete('cartId');

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  };

  // TODO:
  // 1. Calculate total price
  // 2. Create Order record
  // 3. Create OrderItem records
  // 4. Clear cart
  // 5. Revalidate cache
  // 6. Return the order
};