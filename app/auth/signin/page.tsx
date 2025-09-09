'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginSchemaType } from '@/lib/schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SignInPage = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>
            Sign In to your account
          </CardTitle>

          <CardDescription>
            Or{' '}
            <Link
              href='/auth/signup'
              className='font-medium text-primary hover:underline'
            >
              create an account
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>
                Email
              </Label>
              <Input type='email' id='email' placeholder='Email' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>
                Password
              </Label>
              <Input type='password' id='password' placeholder='Password' />
            </div>

            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInPage;