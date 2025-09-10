'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginSchemaType } from '@/lib/schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';

const SignInPage = () => {
  const [error, setError] = useState<string | null>(null);

  const { data: session, update: updateSession } = useSession();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setError(null);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('Invalid email or password');
        } else {
          setError('An error occurred while signing in');
        };
      } else {
        await updateSession();
      };
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An error occurred while signing in');
    };
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
          {error && (<p className='mb-4 text-sm text-destructive'>{error}</p>)}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {session?.user && (<pre>{JSON.stringify(session, null, 2)}</pre>)}

              <Button type='submit' className='w-full cursor-pointer'>
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInPage;