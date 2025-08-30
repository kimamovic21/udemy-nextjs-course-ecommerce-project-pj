import Link from 'next/link';

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
        <div>Right</div>
      </div>
    </div>
  );
};

export default Navbar;