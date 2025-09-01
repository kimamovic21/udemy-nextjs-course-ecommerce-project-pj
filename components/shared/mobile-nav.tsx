import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Electronics', href: '/category/electronics' },
  { id: 2, name: 'Fashion', href: '/category/fashion' },
  { id: 3, name: 'Home', href: '/category/home' },
];

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' size='icon'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>

      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className='flex flex-col gap-4 p-4'>
          <SheetClose asChild>
            <Link href='/'>Home</Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href='/products'>Products</Link>
          </SheetClose>

          <div>
            <h3 className='text-xs font-medium mb-2 text-muted-foreground'>
              Categories
            </h3>

            {categories.map((category) => (
              <SheetClose asChild key={category.id}>
                <Link
                  href={category.href}
                  className='block py-2 text-sm font-medium'
                >
                  {category.name}
                </Link>
              </SheetClose>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;