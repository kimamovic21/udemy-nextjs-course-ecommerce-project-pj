import { getCart } from '@/lib/actions';
import CartEntry from '@/components/shared/cart-entry';

const CartPage = async () => {
  const cart = await getCart();

  return (
    <main className='container mx-auto p-4'>
      {!cart || cart.items.length === 0 ? (
        <div className='text-center'>
          <h2 className='text-2xl'>
            Your cart is empty
          </h2>

          <p className='text-gray-500'>
            Add some items to your cart to get started.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {cart.items.map((item) => (
            <CartEntry key={item.id} cartItem={item} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CartPage;