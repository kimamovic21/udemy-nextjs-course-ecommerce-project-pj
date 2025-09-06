'use server';

import { cookies } from 'next/headers';
import { getCart } from './actions';
import { prisma } from './prisma';

export async function processCheckout() {
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

    // 1. Reload full order
    // 2. Confirm the order was loaded
    // 3. Create the Stripe session
    // 4. Return the session URL and handle the errors
    // 5. Store the session ID in the order & change the order status

    (await cookies()).delete('cartId');

    return order;
  } catch (error) {
    // 1. OPTIONAL: change the order status to failed
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  };
};