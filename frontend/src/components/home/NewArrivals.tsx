import { useEffect, useState } from 'react';
import { getProducts } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import { IProduct } from '../../functions/types';

// import LoadingCard from '../cards/LoadingCard';

const NewArrivals = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts('createdAt', 'desc', 1, 'news').then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="my-3 ss:container section_padding ">
      <div className="font-poppins font-[550] -tracking-[0.04em] text-3xl my-9 ss:ml-0 ml-4">
        New Arrivals
      </div>

      {loading ? (
        <div>Loaaing</div>
      ) : (
        // <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-center ">
        <div className="grid grid-flow-col gap-4 overflow-x-scroll whitespace-nowrap ">
          {products.map((product) => (
            <div key={product._id} className=" rounded-xl">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
