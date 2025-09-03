import { getProducts } from '@/lib/actions';
import { sleep } from '@/lib/utils';
import ProductList from './product-list';

interface ProductListServerWrapperProps {
  query?: string;
  slug?: string;
  sort?: string;
  currentPage?: number;
  productsPerPage?: number;
};

const ProductListServerWrapper = async ({
  query,
  slug,
  sort,
  currentPage,
  productsPerPage,
}: ProductListServerWrapperProps) => {
  await sleep(500);

  const products = await getProducts({
    query,
    slug,
    sort,
    currentPage,
    productsPerPage,
  });

  return (
    <ProductList products={products} />
  );
};

export default ProductListServerWrapper;