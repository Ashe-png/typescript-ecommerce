import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { RootState } from '../reducers';

const Cart = () => {
  const { cart } = useSelector((state: RootState) => ({ ...state }));
  // const dispatch = useDispatch();
  // let navigate = useNavigate();

  const getTotal = () => {
    return cart?.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count! * nextValue.price!;
    }, 0);
  };

  // const saveOrderToDb = () => {
  //   // console.log('cart', JSON.stringify(cart, null, 4));
  //   userCart(cart, user?.token!)
  //     .then((res) => {
  //       // console.log('CArt post res', res)
  //       if (res.data.ok) navigate('/checkout');
  //     })
  //     .catch((err) => console.log('cart save err', err));
  // };

  // const saveCashOrderToDb = () => {
  //   // console.log('cart', JSON.stringify(cart, null, 4));
  //   dispatch({
  //     type: 'COD',
  //     payload: true,
  //   });
  //   userCart(cart, user?.token!)
  //     .then((res) => {
  //       // console.log('CArt post res', res)
  //       if (res.data.ok) navigate('/checkout');
  //     })
  //     .catch((err) => console.log('cart save err', err));
  // };

  const showCartItems = () => (
    <table className="table font-poppins w-full border border-solid border-black border-collapse ">
      <thead className="table-danger text-lg font-medium border border-solid border-black ">
        <tr>
          <th scope="col" className="p-3 border border-solid border-black ">
            Image
          </th>
          <th scope="col" className="p-3 border border-solid border-black">
            Title
          </th>
          <th scope="col" className="p-3 border border-solid border-black">
            Price
          </th>
          <th scope="col" className="p-3 border border-solid border-black">
            Brand
          </th>
          <th scope="col" className="p-3 border border-solid border-black">
            Color
          </th>
          <th scope="col" className="p-3 border border-solid border-black">
            Count
          </th>
          {/* <th scope='col'>Shipping</th> */}
          <th scope="col" className="p-3 border border-solid border-black ">
            Remove
          </th>
        </tr>
      </thead>
      <tbody
        className="align-middle table-light border border-solid border-black"
        style={{ fontSize: '18px' }}
      >
        {cart?.map((p) => (
          <ProductCardInCheckout key={p._id} p={p} />
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="sss:container mt-5">
      <div className="flex flex-col overflow-x-auto">
        <h3 className="text-xl font-poppins text-center mb-8">
          Cart / {cart?.length} Product
        </h3>
        {!cart?.length ? (
          <h6 className="text-lg font-poppins text-center">
            No products in cart. <Link to="/shop">Continue shopping</Link>
          </h6>
        ) : (
          showCartItems()
        )}
      </div>

      <div className="flex font-poppins flex-col mt-8 max-ss:container ">
        <h4 className="text-2xl">Order Summary</h4>
        <hr />
        <h5 className="text-xl">Products : </h5>
        {cart?.map((c, i) => (
          <div key={i}>
            <p className="text-lg">
              {c.title} x {c.count} = Rs. {c.price! * c.count!}
            </p>
          </div>
        ))}
        <hr />
        <p className="text-lg">
          {' '}
          Total : <b className="text-prim">Rs. {getTotal()}</b>{' '}
        </p>
        <hr />
        {/* {user ? (
          <>
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-danger mt-2 fs-6"
              disabled={!cart?.length}
            >
              Proceed to Checkout
            </button>
            <br />
            <button
              onClick={saveCashOrderToDb}
              className="btn btn-sm btn-danger mt-2 fs-6"
              disabled={!cart?.length}
            >
              Cash on Delivery
            </button>
          </>
        ) : (
          <button className="btn btn-sm btn-danger mt-2 fs-6">
            <Link to="/login" className="text-white" state={{ from: `/cart` }}>
              Login to Checkout
            </Link>
          </button>
        )} */}
      </div>
    </div>
  );
};
export default Cart;
