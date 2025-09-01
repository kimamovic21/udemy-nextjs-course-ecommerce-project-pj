import { notFound } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { getProductBySlug } from '@/lib/actions';
import { formatPrice, sleep } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
        },
      ],
    },
  };
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  };

  const breadcrumbs = [
    {
      label: 'Products',
      href: '/'
    },
    {
      label: product.category?.name,
      href: `/category/${product.category?.slug}`,
    },
    {
      label: product.name,
      href: `/product/${product.slug}`,
      active: true
    },
  ];

  await sleep(500);

  return (
    <main className='container mx-auto p-4'>
      <Breadcrumbs items={breadcrumbs} />

      <Card className='max-w-3xl mx-auto'>
        <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='relative rounded-lg overflow-hidden h-[200px] md:h-[400px]'>
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes='(max-width: 768px) 100vw, 50vw'
                className='object-cover'
              />
            )}
          </div>

          <div>
            <h1 className='text-3xl font-bold mb-2'>
              {product.name}
            </h1>

            <div className='flex items-center gap-2 mb-4'>
              <span className='font-semibold text-lg'>
                {formatPrice(product.price)}
              </span>

              <Badge variant='outline'>
                {product.category?.name}
              </Badge>
            </div>

            <Separator className='my-4' />

            <div className='space-y-2'>
              <h2 className='font-medium'>
                Description
              </h2>
              <p>
                {product.description}
              </p>
            </div>

            <Separator className='my-4' />

            <div className='space-y-2'>
              <h2 className='font-medium'>
                Availability
              </h2>

              <div className='flex items-center gap-2'>
                {product.inventory > 0 ? (
                  <Badge variant='outline' className='text-green-600'>
                    In stock
                  </Badge>
                ) : (
                  <Badge variant='outline' className='text-red-600'>
                    Out of stock
                  </Badge>
                )}

                {product.inventory > 0 && (
                  <span className='text-xs text-gray-500'>
                    ({product.inventory} items available)
                  </span>
                )}
              </div>
            </div>
          </div>

          <Separator className='my-4' />

          <div>
            <Button disabled={product.inventory === 0} className='w-full cursor-pointer'>
              <ShoppingCart className='mr-1 w-4 h-4' />
              {product.inventory > 0 ? 'Add to cart' : 'Out of stock'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProductPage;