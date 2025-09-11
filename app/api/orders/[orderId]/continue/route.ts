import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
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