import ProductsSkeleton from './products-skeleton';
import BreadcrumbsSkeleton from '@/components/shared/breadcrumbs-skeleton';

const Loading = () => {
  return (
    <main className='container mx-auto p-4'>
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />
    </main>
  );
};

export default Loading;