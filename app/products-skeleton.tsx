import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className='pt-0 overflow-hidden'>
          <div className='relative aspect-video'>
            <Skeleton className='h-full w-full' />
          </div>

          <CardHeader>
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-full' />
          </CardHeader>

          <CardFooter>
            <Skeleton className='h-5 w-16' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsSkeleton;