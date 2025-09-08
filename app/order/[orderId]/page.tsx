import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import OrderItem from './order-item';
import OrderSummary from './order-summary';

interface OrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
};

const OrderPage = async ({ params }: OrderPageProps) => {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  };

  return (
    <main className='container mx-auto p-4'>
      <ul>
        {order.items.map((item) => (
          <OrderItem key={item.id} orderItem={item} />
        ))}
      </ul>

      <OrderSummary order={order} />
    </main>
  );
};

export default OrderPage;