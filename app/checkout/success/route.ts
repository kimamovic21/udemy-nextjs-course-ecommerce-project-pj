import { notFound, redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    notFound();
  };

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      notFound();
    };

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        stripeSessionId: sessionId,
      },
    });

    if (!order) {
      notFound();
    };

    if (order.status === 'pending_payment') {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'payment_processed',
        },
      });
    };

    return redirect('/');
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    notFound();
  };
};