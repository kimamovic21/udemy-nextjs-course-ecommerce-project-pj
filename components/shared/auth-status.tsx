'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogIn, LogOut } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';

const AuthStatus = () => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <Skeleton className='w-9 h-9' />;
  };

  if (sessionStatus === 'unauthenticated') {
    return (
      <Button variant='ghost' size='icon' asChild>
        <Link href='/auth/signin'>
          <LogIn className='h-5 w-5' />
        </Link>
      </Button>
    );
  };

  return (
    <Button variant='ghost' size='icon' onClick={() => signOut()}>
      <LogOut className='h-5 w-5' />
    </Button>
  );
};

export default AuthStatus;