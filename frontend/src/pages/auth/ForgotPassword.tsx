import { useState, useEffect, FormEvent } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../reducers/userReducer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { user } = useSelector((state: userState) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: import.meta.env.VITE_REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link. ');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="min-w-[300px] max-w-[575px] w-full">
        <div className="border p-4">
          {loading ? (
            <h4 className="text-center pb-7 text-red-600 text-2xl font-semibold">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center pb-7 text-2xl font-semibold">
              Forgot Password
            </h4>
          )}
          <form
            className="flex flex-col rounded p-3 my-5 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              className="border border-zinc-300 bg-back rounded-2xl focus:outline-none focus:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] focus:shadow-prim  p-1.5 w-[95%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Your Email"
              autoFocus
            />
            <br />
            <button
              type="submit"
              className="outline-none border-solid text-white rounded-full bg-prim py-2 my-1 w-full "
              disabled={!email}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
