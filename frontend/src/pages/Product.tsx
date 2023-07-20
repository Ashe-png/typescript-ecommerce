import { useEffect, useState } from 'react';
import { productStar, getProduct, getRelated } from '../functions/product';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/cards/SingleProduct.js';
import ProductCard from '../components/cards/ProductCard';
import { RootState } from '../reducers/index.js';
import { IProduct } from '../functions/types.js';

const Product = () => {
  const [product, setProduct] = useState<IProduct>({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState<IProduct[]>([]);

  const { user } = useSelector((state: RootState) => ({ ...state }));

  const { slug } = useParams();

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id?.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug!).then((res) => {
      // console.log(res.data);
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (value: number, name: string) => {
    setStar(value);

    console.log(`${value} to ${name}`);
    productStar(name, value, user!.token!).then((res) => {
      console.log('rating clicked', res.data);
      loadSingleProduct(); //if you want to show updated rating in real time
    });
  };

  return (
    <div className="ss:container">
      <div className="mt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="font-poppins text-center  font-[550] -tracking-[0.04em] text-3xl my-12 ss:ml-0 ml-4">
        Related Products
      </div>

      <div className="grid grid-flow-col gap-4  items-center  overflow-x-scroll whitespace-nowrap section_padding">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="rounded-xl">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col"> "No products found"</div>
        )}
      </div>
    </div>
  );
};

export default Product;
