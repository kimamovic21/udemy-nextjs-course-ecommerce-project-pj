import { Button } from '../ui/button';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';

const categories = [
  { id: 1, name: 'Electronics', href: '/category/electronics' },
  { id: 2, name: 'Fashion', href: '/category/fashion' },
  { id: 3, name: 'Home', href: '/category/home' },
];

const Navbar = () => {
  return (
    <div className='border-b'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div>
          <div className='flex items-center gap-6'>
            <Link className='text-2xl font-bold' href='/'>
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
          </div>
        </div>

        <div className='flex items-center gap-4'>
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