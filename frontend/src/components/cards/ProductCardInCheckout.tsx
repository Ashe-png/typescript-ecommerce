import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { Trash3Fill } from 'react-bootstrap-icons';
import { cartState } from '../../reducers/cartReducer';
import { IProduct } from '../../functions/types';

const ProductCardInCheckout = ({ p }: { p: IProduct }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  let dispatch = useDispatch();

  const handleChangeColor = (e: any) => {
    // console.log('color changed', e.target.value);

    let cart: cartState = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!);
      }

      cart?.map((product, i) => {
        if (product._id === p._id) {
          cart![i].color = e.target.value;
        }
      });
      // console.log('cart update color', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e: any) => {
    // console.log('available quantity',p.quantity);

    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity!) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }
    let cart: cartState = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!);
      }

      cart?.map((product, i) => {
        if (product._id === p._id) {
          cart![i].count = count;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id);
    let cart: cartState = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!);
      }

      cart?.map((product, i) => {
        if (product._id === p._id) {
          cart?.splice(i, 1);
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  return (
    // <tbody>
    <tr>
      <td className="border border-black border-collapse  flex  justify-center items-center p-2">
        <div className="w-[200px] ">
          {p.images!.length ? (
            <ModalImage small={p.images![0].url} large={p.images![0].url} />
          ) : (
            <ModalImage
              small="https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197777/cld-sample.jpg"
              large="https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197777/cld-sample.jpg"
            />
          )}
        </div>
      </td>
      <td className="font-semibold text-lg text-center border border-solid border-black">
        {p.title}
      </td>
      <td className="border text-center border-solid border-black">
        Rs. {p.price}
      </td>
      <td className="border text-center border-solid border-black">
        {p.brand?.name}
      </td>
      <td className="border text-center border-solid border-black">
        <select
          onChange={handleChangeColor}
          name="color"
          className="bg-input rounded-lg p-2"
        >
          {p.color ? (
            <option value={p.color}>{p.color}</option>
          ) : (
            <option>Select</option>
          )}
          {colors
            .filter((c) => c !== p.color)
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </td>
      <td className="border text-center border-solid border-black">
        <input
          type="number"
          className="bg-input text-center rounded-lg p-2"
          value={p.count}
          onChange={handleQuantityChange}
          style={{ width: '60px', height: '30px' }}
        />
      </td>
      {/* <td>{p.shipping === 'Yes' ? (
                    <CheckCircleOutlined className='text-success' />
                ) : (
                    <CloseCircleOutlined className='text-danger'/>
                ) }</td> */}
      <td className="border text-center border-solid border-black">
        <button
          onClick={handleRemove}
          className="`inline-flex font-poppins items-center mb-4 justify-center rounded-lg outline outline-1 text-base max-w-[275px] lg:w-[65%] font-medium cursor-pointer h-10 px-2 py-2 hover:w-[67%] text-primary-foreground bg-primhigh transition-all duration-500` "
        >
          Remove
        </button>
      </td>
    </tr>
    // {/* </tbody> */}
  );
};

export default ProductCardInCheckout;
