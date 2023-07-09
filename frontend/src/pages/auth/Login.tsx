import { useState, useEffect, FormEvent } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';
import { AxiosResponse } from 'axios';
import { userState } from '../../reducers/userReducer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const { user } = useSelector((state: userState) => ({ ...state }));
  useEffect(() => {
    let intended = location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) navigate('/');
    }
  }, [user, navigate]);

  const roleBasedRedirect = (res: AxiosResponse) => {
    //check if intended
    let intended = location.state;

    if (intended) {
      navigate(intended.from);
    } else {
      if (res.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/history');
      }
    }
  };

  let dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.table(email);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      const { user } = result;
      const idTokenResult = await user?.getIdTokenResult();

      createOrUpdateUser(idTokenResult!.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult!.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
          setLoading(false);
        })
        .catch((err: any) => console.log(err));
      // navigate("/");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user?.getIdTokenResult();
        createOrUpdateUser(idTokenResult!.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult!.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => (
    <form className="shadow bg-body rounded p-3 w-100" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="border border-zinc-300 bg-back mb-6 rounded-2xl focus:outline-none focus:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] focus:shadow-prim  p-1.5 w-[95%]"
          value={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="border border-zinc-300 bg-back rounded-2xl focus:outline-none focus:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] focus:shadow-prim  p-1.5 w-[95%]"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />
      <Button
        htmlType="submit"
        type="ghost"
        className="mt-3 mb-3 bg-accenlow hover:bg-accen cursor-pointer text-white"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="flex justify-center items-center ">
      <div className="min-w-[300px] max-w-[575px] w-full">
        <div className="border p-4">
          {loading ? (
            <h3 className="text-center pb-7 text-red-600 text-2xl font-semibold ">
              Loading
            </h3>
          ) : (
            <h3 className="text-center pb-7 text-2xl font-semibold">Login</h3>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="ghost"
            className="mt-3 mb-3 bg-primlow hover:bg-prim text-white"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <span className="text-muted">Forgot Password? </span>{' '}
          <Link to="/forgot-password" className="text-danger">
            Click here
          </Link>
          <br />
          <span className="text-muted">Dont have an account? </span>{' '}
          <Link to="/register" className="text-danger">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
