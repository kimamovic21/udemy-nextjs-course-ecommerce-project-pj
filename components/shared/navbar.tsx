import { Suspense } from 'react';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import MobileNav from './mobile-nav';
import SearchInput from './search-input';
import CartIndicator from './cart-indicator';
import CartIndicatorSkeleton from './cart-indicator-skeleton';
import AuthStatus from './auth-status';

export const categories = [
  { id: 1, name: 'Electronics', href: '/search/electronics' },
  { id: 2, name: 'Clothing', href: '/search/clothing' },
  { id: 3, name: 'Home', href: '/search/home' },
];

const Navbar = () => {
  return (
    <div className='border-b border-dashed px-2'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div>
          <div className='flex items-center gap-6'>
            <Link className='text-2xl font-bold hidden md:block' href='/'>
              Store
            </Link>

            <nav className='hidden md:flex items-center gap-6'>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
                  href={category.href}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <MobileNav />
          </div>
        </div>

        <div className='block w-full mx-4 md:mx-8'>
          <SearchInput />
        </div>

        <div className='flex items-center gap-0'>
          <AuthStatus />

          <Suspense fallback={<CartIndicatorSkeleton />}>
            <CartIndicator />
          </Suspense>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;