import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useState } from 'react';
import { cartState } from '../../reducers/cartReducer';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import { IProduct } from '../../functions/types';

type Props = {
  product: IProduct;
  fromWishList?: boolean;
  handleRemove?: (productId: string) => void;
};

const ProductCard = ({ product, fromWishList, handleRemove }: Props) => {
  const dispatch = useDispatch();

  const { title, images, price, _id } = product;
  const [innerText, setInnerText] = useState('Add to Cart');

  const handleAddToCart = () => {
    //craete cart array
    let cart: cartState = [];
    if (typeof window !== 'undefined') {
      //if cart is in localstorage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!);
      }

      if (innerText === 'Added') {
        cart?.map((products, i) => {
          if (products._id === product._id) {
            cart?.splice(i, 1);
          }
        });
        setInnerText('Add to Cart');

        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: 'ADD_TO_CART',
          payload: cart,
        });
      } else {
        cart?.push({
          ...product,
          count: 1,
        });
        let unique = _.uniqWith(cart, _.isEqual);
        //save to local storage
        // console.log('unique', unique);
        localStorage.setItem('cart', JSON.stringify(unique));

        setInnerText('Added');

        //add to redux state
        dispatch({
          type: 'ADD_TO_CART',
          payload: unique,
        });
      }

      //show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  return (
    <div
      key={product._id}
      className="flex font-poppins relative flex-col w-[356px] max-ss:w-[215px] max-md:w-[215px] max-lg:w-[177px] max-sm:w-[303px] max-xs:w-[120px] max-vs:max-w-[120px] vs:min-w-[150px] vs:max-w-[177px] sss:min-w-[177px] sss:max-w-[270px] sm:min-w-[215px] max-xl:w-[303px] xl:min-w-[303px] xl:max-w-[356px]"
    >
      <Link to={`/product/${product.slug}`}>
        <img
          src={
            images && images.length
              ? images[0].url
              : 'https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197777/cld-sample.jpg'
          }
          className="object-cover aspect-square w-full rounded-t-xl"
        />
      </Link>

      <div className=" py-2 px-1 ">
        <div className="flex flex-col justify-between text-lg sss:text-xl text-bold">
          <Link to={`/product/${product.slug}`}>
            <h6 className="font-poppins">{title}</h6>
          </Link>
          <h6 className="">Rs. {price}</h6>
        </div>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="py-2 font-poppins">No rating yet</div>
        )}
        <div className="flex flex-col justify-between mt-2">
          <button
            onClick={handleAddToCart}
            className={`${
              innerText === 'Added'
                ? 'bg-black text-white outline-black'
                : 'text-black bg-transparent'
            } inline-flex font-poppins items-center justify-center rounded-full outline outline-1 text-base lg:w-[50%] font-medium cursor-pointer h-10 px-2 py-2  hover:outline-black hover:text-primary-foreground hover:bg-black transition-all duration-500`}
          >
            {innerText}
          </button>
          {fromWishList && (
            <button
              onClick={() => handleRemove?.(_id!)}
              className="inline-flex font-poppins mt-3 bg-primhigh text-primary-foreground items-center justify-center rounded-full outline outline-1 text-base hover:w-[57%] lg:w-[50%] font-medium cursor-pointer h-10 px-2 py-2 transition-all duration-500"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
