import { useState, useEffect } from 'react';

import { getWishlist, removeWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import ProductCard from '../../components/cards/ProductCard';
import { IProduct } from '../../functions/types';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user?.token!).then((res) => {
      // console.log(user)
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId: string) => {
    removeWishlist(productId, user?.token!).then(() => {
      loadWishlist();
    });
  };

  return (
    <div className="ss:container">
      <h4 className="text-center p-3 mt-5 mb-5 text-3xl bg-light">Wishlist</h4>
      <div className="grid grid-cols-2 mt-4 gap-4 as:grid-cols-3 xl:grid-cols-3 justify-center items-center">
        {wishlist.map((p) => (
          <div
            key={p._id}
            className="flex justify-center items-center rounded-xl"
          >
            <ProductCard
              product={p}
              handleRemove={handleRemove}
              fromWishList={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
