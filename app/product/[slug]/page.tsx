import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/actions';
import { formatPrice, sleep } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import AddToCartButton from '@/components/shared/add-to-cart-button';

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
}

export const revalidate = 10;

export const generateStaticParams = async () => {
  const products = await prisma.product.findMany({
    select: {
      slug: true,
    },
  });
  return products.map((product) => ({
    slug: product.slug,
  }));
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  console.log(`Fetching product ${slug}`);

  if (!product) {
    notFound();
  };

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inventory > 0 ? 'InStock' : 'OutOfStock',
    },
  };

  const breadcrumbs = [
    {
      label: 'Search',
      href: '/search'
    },
    {
      label: product.category?.name,
      href: `/search/${product.category?.slug}`,
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

      <Card>
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

            <Separator className='my-4' />

            <AddToCartButton product={product} />
          </div>
        </CardContent>
      </Card>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
};

export default ProductPage;