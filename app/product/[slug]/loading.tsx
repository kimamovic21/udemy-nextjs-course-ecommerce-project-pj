import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import BreadcrumbsSkeleton from '@/components/shared/breadcrumbs-skeleton';

const Loading = () => {
  return (
    <main className='container mx-auto p-4'>
      <BreadcrumbsSkeleton />

      <Card>
        <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='relative rounded-lg overflow-hidden h-[200px] md:h-[400px]'>
            <Skeleton className='h-full w-full' />
          </div>

          <div className='space-y-4'>
            <Skeleton className='h-8 w-3/4' />

            <div className='flex items-center gap-2'>
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-6 w-32' />
            </div>

            <Separator className='my-4' />

            <div className='space-y-2'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-5/6' />
            </div>

            <Separator className='my-4' />

            <div className='space-y-2'>
              <Skeleton className='h-6 w-32' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>

            <Separator className='my-4' />

            <Skeleton className='h-10 w-full' />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Loading;