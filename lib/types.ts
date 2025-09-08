import type { Prisma } from '@/app/generated/prisma';
import type { OrderWithItemsAndProduct } from './stripe';

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ProcessCheckoutResponse = {
  sessionUrl: string;
  order: OrderWithItemsAndProduct;
};