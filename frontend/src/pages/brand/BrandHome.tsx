import { useState, useEffect } from 'react';
import { getBrand } from '../../functions/brand';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';
import { IBrand, IProduct } from '../../functions/types';

const BrandHome = () => {
  const { slug } = useParams();
  const [brand, setBrand] = useState<IBrand>({});
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBrand(slug!).then((res) => {
      setBrand(res.data.brand);
      setProducts(res.data.products);
      setLoading(false);
      // console.log(JSON.stringify(res.data, null, 4));
    });
  }, []);

  return (
    <div className="ss:container">
      <div className="flex flex-row justify-center items-center">
        {loading ? (
          <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light">
            Loading..
          </h4>
        ) : (
          <h4 className="text-center p-3 mt-5 mb-5 text-2xl bg-light">
            {products.length} Products in "{brand.name}" Brand
          </h4>
        )}
      </div>

      <div className="grid grid-cols-2 mt-4 gap-4 as:grid-cols-3 xl:grid-cols-3 justify-center items-center">
        {products.map((p) => (
          <div
            className="flex justify-center items-center rounded-xl"
            key={p._id}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandHome;
