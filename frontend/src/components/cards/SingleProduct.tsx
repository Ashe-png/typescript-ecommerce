import { Tabs, TabsProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Rating } from 'react-simple-star-rating';

import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

import { RootState } from '../../reducers';
import { cartState } from '../../reducers/cartReducer';
import { useState } from 'react';
import { IProduct } from '../../functions/types';

type Props = {
  product: IProduct;
  onStarClick: (value: number, name: string) => void;
  star: number;
};

const SingleProduct = ({ product, onStarClick, star }: Props) => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => ({ ...state }));
  const dispatch = useDispatch();
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

  const {
    title,
    images,
    description,
    price,
    category,
    subs,
    color,
    brand,

    _id,
  } = product;

  const handleAddToWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToWishlist(product._id!, user!.token!).then((res) => {
      console.log('ADDED TO WISHLIST', res.data);
      toast.success('Added to wishlist');
      navigate('/user/wishlist');
    });
  };

  const handleClick = (value: number) => {
    onStarClick(value, _id!);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Description`,
      children: (
        <div className="container">
          <ul className="sss:text-lg text-base list-disc  break-words  as:columns-2 font-poppins w-[100%]">
            {description?.map((descriptions) => (
              <li key={descriptions} className="w-[100%]">
                {descriptions}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      key: '2',
      label: `More`,
      children: (
        <div className="container sss:text-lg text-base">
          Call us for more information
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col as:flex-row">
        <div className="as:w-[70%]">
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img
                  src={i.url}
                  className="object-cover ss:rounded-xl"
                  key={i.public_id}
                />
              ))}
          </Carousel>
        </div>
        <div className="flex font-poppins flex-col as:pl-6 max-as:container">
          <div className="text-base font-poppins  ">
            <Link className="text-gray-400" to="/">
              Home /{' '}
            </Link>
            {category && (
              <Link
                className="text-gray-400"
                to={`/category/${category}`}
              >{`${category.name} / `}</Link>
            )}
            {subs && (
              <Link
                className="text-gray-400"
                to={`/sub/${subs[0].slug}`}
              >{`${subs[0].name} / `}</Link>
            )}
            <Link className="text-gray-400" to="#">
              {title}
            </Link>
          </div>
          <h3 className="pt-1 pb-1 text-2xl sss:text-3xl font-poppins font-semibold">
            {title}
          </h3>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-base sss:text-lg pb-1">No rating yet</div>
          )}

          <div className="sss:text-3xl text-2xl font-poppins font-semibold pt-3 pb-3">
            Rs. {price}
          </div>

          <hr className="mt-4 mb-4 text-gray-400" />
          <div className="mb-1 max-sss:text-base text-lg">
            Brand :{' '}
            <Link to={`/brand/${brand?.slug}`} className="text-danger">
              {brand?.name}
            </Link>
          </div>
          <div className="mb-1 max-sss:text-base text-lg">
            Color : <span className="text-danger">{color}</span>
          </div>
          {category && (
            <div className="mb-1 max-sss:text-base text-lg">
              Category :{' '}
              <Link to={`/category/${category.slug}`} className="text-danger">
                {category.name}
              </Link>
            </div>
          )}
          {subs && (
            <div className="mb-1 max-sss:text-base text-lg">
              Sub Categories :{' '}
              {subs.map((s) => (
                <Link
                  key={s._id}
                  to={`/sub/${s.slug}`}
                  className="text-danger ms-2 me-2"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          )}
          <div className="as:mb-6 mb-4 text-base sss:text-lg">
            Available : Yes
          </div>
          {/* <div className="mb-4" style={{ fontSize: '17px' }}>
            Sold : <span className="text-danger">{sold}</span>
          </div> */}

          <button
            onClick={handleAddToCart}
            className={`${
              innerText === 'Added'
                ? 'bg-black text-primary-foreground outline-black'
                : 'text-black bg-transparent'
            } inline-flex font-poppins items-center mb-4  justify-center rounded-full outline outline-1 text-base max-w-[275px] lg:w-[65%] font-medium cursor-pointer h-10 px-2 py-2 hover:w-[67%]  hover:outline-black hover:text-primary-foreground hover:bg-black transition-all duration-500`}
          >
            {innerText}
          </button>

          <button
            onClick={handleAddToWishlist}
            className={`inline-flex font-poppins items-center mb-4 justify-center rounded-full outline outline-1 text-base max-w-[275px] lg:w-[65%] font-medium cursor-pointer h-10 px-2 py-2 hover:w-[67%] text-primary-foreground bg-black transition-all duration-500`}
          >
            Add To Wishlist
          </button>

          <RatingModal>
            <Rating
              initialValue={star}
              onClick={handleClick}
              transition
              fillColor="red"
            />
          </RatingModal>
        </div>
      </div>
      <div className=" ms-5 w-[85%]">
        <Tabs defaultActiveKey="1" size="large" items={items} type="card" />
      </div>
    </>
  );
};

export default SingleProduct;
