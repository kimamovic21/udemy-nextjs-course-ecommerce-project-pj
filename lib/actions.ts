'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/app/generated/prisma';
import type { CartWithProducts, ShoppingCart } from './types';

interface GetProductsParams {
  query?: string;
  slug?: string;
  sort?: string;
  currentPage?: number;
  productsPerPage?: number;
};

export async function getProducts({
  query,
  slug,
  sort,
  currentPage = 1,
  productsPerPage = 3,
}: GetProductsParams) {
  const where: Prisma.ProductWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ];
  };

  if (slug) {
    where.category = {
      slug: slug,
    };
  };

  let orderBy: Record<string, 'asc' | 'desc'> | undefined = undefined;

  if (sort === 'price-asc') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price-desc') {
    orderBy = { price: 'desc' };
  };

  const skip = productsPerPage ? (currentPage - 1) * productsPerPage : undefined;
  const take = productsPerPage;

  return await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take,
  });
};

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) return null;

  return product;
};

async function findCartFromCookie(): Promise<CartWithProducts | null> {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    return null;
  };

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return cart;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const cart = await findCartFromCookie();

  if (!cart) {
    return null;
  };

  return {
    ...cart,
    size: cart.items.length,
    subtotal: cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
  };
};

async function getOrCreateCart(): Promise<CartWithProducts> {
  let cart = await findCartFromCookie();

  if (cart) {
    return cart;
  };

  cart = await prisma.cart.create({
    data: {},
    include: { items: { include: { product: true } } },
  });

  (await cookies()).set('cartId', cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return cart;
};

export async function addToCart(
  productId: string,
  quantity: number = 1
) {
  if (quantity < 1) {
    throw new Error('Quantity must be at least 1');
  };

  const cart = await getOrCreateCart();
  const existingItem = cart.items.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  };
};