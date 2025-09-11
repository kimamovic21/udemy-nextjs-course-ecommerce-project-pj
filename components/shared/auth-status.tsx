'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogIn, User } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const AuthStatus = () => {
  const {
    status: sessionStatus,
    data: sessionData
  } = useSession();

  if (sessionStatus === 'loading') {
    return (<Skeleton className='w-9 h-9 animate-pulse' />);
  };

  if (sessionStatus === 'unauthenticated') {
    return (
      <Button variant='ghost' size='icon' asChild>
        <Link href='/auth/signin'>
          <LogIn className='h-5 w-5 cursor-pointer' />
        </Link>
      </Button>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Button variant='ghost' size='icon'>
          <User className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {sessionData?.user?.name}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/account' className='cursor-pointer'>
            My Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className='cursor-pointer'
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthStatus;