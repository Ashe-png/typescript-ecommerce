import { useState } from 'react';
import { Badge, Dropdown } from 'antd';
import react from '../../assets/react.svg';
import {
  UserOutlined,
  HeartOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import type { MenuProps } from 'antd';
import { RootState } from '../../reducers';
import { cartState } from '../../reducers/cartReducer';
import Search from '../forms/Search';

const Menu = ({ cart2 }: { cart2: cartState }) => {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/shop">Store</Link>
      </li>
      <li>
        <Link to="/cart">
          <Badge
            className="font-medium font-poppins text-lg"
            count={cart2?.length}
            offset={[9, 0]}
          >
            Cart
          </Badge>
        </Link>
      </li>
    </>
  );
};

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  let { user, cart } = useSelector((state: RootState) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Link className="text-lg" to="/user/wishlist">
          <HeartOutlined className="text-xl align-baseline pr-2" />
          Wishlist
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Link className="text-lg" to="/" onClick={logout}>
          <LogoutOutlined className="text-xl align-baseline pr-2" />
          Logout
        </Link>
      ),
      key: '2',
    },
  ];

  const adminitems: MenuProps['items'] = [
    {
      label: (
        <Link className="text-lg" to="/user/wishlist">
          <HeartOutlined className="text-xl align-baseline pr-2" />
          Wishlist
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Link className="text-lg" to="/" onClick={logout}>
          <LogoutOutlined className="text-xl align-baseline pr-2" />
          Logout
        </Link>
      ),
      key: '2',
    },
    {
      label: (
        <Link className="text-lg" to="/admin/dashboard">
          <AppstoreOutlined className="text-xl align-baseline pr-2" />
          Dashboard
        </Link>
      ),
      key: '3',
    },
  ];

  const menuProps = {
    items,
  };

  const adminProps = {
    items: adminitems,
  };

  return (
    <nav className="w-full ss:container section_padding font-poppins text-lg font-medium flex py-6 justify-between items-center ">
      <Link to="/">
        <img src={react} alt="logo" className="w-[32px] h-[32px] " />
      </Link>

      <ul className="list-none pl-10 ml-4 sm:flex hidden gap-6 items-center ss:w-[40%] md:w-[55%] xl:w-[75%] ">
        <Menu cart2={cart} />
      </ul>
      <div className=" vs:flex sm:hidden hidden items-center">
        <Search />
      </div>
      <div className="sm:flex hidden gap-6  items-center">
        <div className="vs:flex hidden items-center">
          <Search />
        </div>

        {!user && (
          <>
            <p>
              <Link to="/login">Login</Link>
            </p>
            <p>
              <Link to="/register">Register</Link>
            </p>
          </>
        )}
        {user && user.role === 'subscriber' && (
          <p>
            <Dropdown
              menu={menuProps}
              placement="bottomRight"
              overlayClassName="w-[200px]"
            >
              <UserOutlined className="text-2xl pb-2" />
            </Dropdown>
          </p>
        )}
        {user && user.role === 'admin' && (
          <p>
            <Dropdown
              menu={adminProps}
              placement="bottomRight"
              overlayClassName="w-[200px]"
            >
              <UserOutlined className="text-2xl pb-2" />
            </Dropdown>
          </p>
        )}
      </div>
      <div className="sm:hidden flex justify-end items-center">
        {toggleMenu ? (
          <RiCloseLine
            color="black"
            size={27}
            onClick={() => {
              setToggleMenu((prev) => !prev);
            }}
          />
        ) : (
          <RiMenu3Line
            color="black"
            size={27}
            onClick={() => {
              setToggleMenu((prev) => !prev);
            }}
          />
        )}
        <div
          className={`${
            toggleMenu ? 'flex' : 'hidden'
          } flex-col py-3 bg-secon absolute top-[3.5rem] right-0 m-2 w-[95%] ss:max-w-[250px] rounded-xl sidebar justify-center items-center transition-all z-10 animate-scale-up-ver-center`}
        >
          <ul className="space-y-2">
            <Menu cart2={cart} />
          </ul>

          {!user && (
            <div className="flex-col flex justify-center items-center space-y-2 pt-2">
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </div>
          )}
          {user && (
            <div className="flex-col flex justify-center items-center space-y-2 pt-2">
              <Link to="/user/wishlist">Wishlist</Link>
              {user.role === 'admin' && (
                <Link to="/admin/dashboard">Dashboard</Link>
              )}
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
