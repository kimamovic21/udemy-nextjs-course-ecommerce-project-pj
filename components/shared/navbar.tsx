import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import MobileNav from './mobile-nav';

const categories = [
  { id: 1, name: 'Electronics', href: '/category/electronics' },
  { id: 2, name: 'Fashion', href: '/category/fashion' },
  { id: 3, name: 'Home', href: '/category/home' },
];

const Navbar = () => {
  return (
    <div className='border-b border-dashed'>
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

        <div className='flex items-center gap-0'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/search'>
              <Search className='h-5 w-5' />
            </Link>
          </Button>

          <Button variant='ghost' size='icon' asChild>
            <Link href='/cart'>
              <ShoppingCart className='h-5 w-5' />
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;