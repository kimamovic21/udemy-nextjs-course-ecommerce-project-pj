import { getProductsCached } from '@/lib/actions';
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
  const products = await getProductsCached({
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