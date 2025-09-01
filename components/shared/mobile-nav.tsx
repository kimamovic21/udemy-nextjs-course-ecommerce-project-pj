import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger } from '../ui/sheet';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' size='icon'>
          <Menu className='h-5 w-5' />
        </Button>
      </SheetTrigger>
    </Sheet>
  );
};

export default MobileNav;