import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/actions';
import { formatPrice, sleep } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

  await sleep(500);

  return (
    <main className='container mx-auto p-4'>
      <Card className='max-w-3xl mx-auto '>
        <CardContent className='p-6'>
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
        </CardContent>
      </Card>
    </main>
  );
};

export default ProductPage;