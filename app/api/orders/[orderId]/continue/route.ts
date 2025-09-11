import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await context.params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || !order.stripeSessionId) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  };

  const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);

  if (!session.url) {
    return NextResponse.json({ error: 'No active checkout session' }, { status: 400 });
  };

  return NextResponse.redirect(session.url);
};