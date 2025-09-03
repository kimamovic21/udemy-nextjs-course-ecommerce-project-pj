'use server';

import { cookies } from 'next/headers';
import { prisma } from './prisma';
import type { Prisma } from '@/app/generated/prisma';
import type { ShoppingCart } from './types';

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

export async function getCart(): Promise<ShoppingCart | null> {
  const cartId = (await cookies()).get('cartId')?.value;

  const cart = cartId
    ? await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    : null;

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