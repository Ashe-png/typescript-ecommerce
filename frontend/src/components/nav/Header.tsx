import { useState } from 'react';
import react from '../../assets/react.svg';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';

const Menu = () => {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a href="#store">Store</a>
      </li>
      <li>
        <a href="#cart">Cart</a>
      </li>
    </>
  );
};

const Header = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  let { user } = useSelector((state: any) => ({ ...state }));
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/login');
  };
  return (
    <div>
      <nav className="w-full flex py-6 justify-between items-center ">
        <Link to="/">
          <img src={react} alt="logo" className="w-[32px] h-[32px] " />
        </Link>

        <ul className="list-none pl-10 ml-4 sm:flex hidden gap-6 items-center flex-1">
          <Menu />
        </ul>

        <div className="sm:flex hidden gap-6 pr-10 items-center">
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
          {user && (
            <p>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </p>
          )}
        </div>
        <div className="sm:hidden flex flex-1 justify-end items-center">
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
            } flex-col p-6 bg-red-500 absolute top-[3.5rem] text-right right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="">
              <Menu />
            </ul>

            {!user && (
              <div>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </div>
            )}
            {user && (
              <div>
                <p>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
