import { Skeleton } from '../ui/skeleton';

const BreadcrumbsSkeleton = () => {
  return (
    <div className='mb-6 flex items-center gap-2'>
      <Skeleton className='h-4 w-4 rounded-full' />
      <Skeleton className='h-4 w-[80px]' />
      <Skeleton className='h-4 w-[120px]' />
    </div>
  );
};

export default BreadcrumbsSkeleton;