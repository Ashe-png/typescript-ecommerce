import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import laptop from '../../images/laptop.PNG';
import { RootState } from '../../reducers';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state: RootState) => ({ ...state }));

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart?.length} Product`}
      closable={true}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        });
      }}
      open={drawer}
    >
      {cart?.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images![0] ? (
              <>
                <img
                  src={p.images![0].url}
                  style={{
                    width: '175px',
                    height: '150px',
                    objectFit: 'cover',
                  }}
                />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img
                  src="https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197777/cld-sample.jpg"
                  style={{
                    width: '175px',
                    height: '150px',
                    objectFit: 'cover',
                  }}
                />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            })
          }
          className="btn btn-primary btn-block "
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
