import { useState, useEffect, FormEvent } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ActionCodeSettings } from '@firebase/auth-types';
import { RootState } from '../../reducers';

const Register = () => {
  const [email, setEmail] = useState('');

  let navigate = useNavigate();
  const { user } = useSelector((state: RootState) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_REACT_APP_REGISTER_REDIRECT_URL);
    console.log('hello');
    const config: ActionCodeSettings = {
      url: import.meta.env.VITE_REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem('emailForRegistration', email);
    // // clear state
    setEmail('');
  };

  const registerForm = () => (
    <form
      className="flex flex-col shadow border-solid border-[1px] rounded p-3 my-10 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center pb-7 ">Register</h3>
      <input
        type="email"
        className="border border-zinc-300 bg-back rounded-2xl focus:outline-none focus:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] focus:shadow-prim  p-1.5 w-[95%]"
        value={email}
        placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <button
        type="submit"
        className="outline-none border-solid text-white rounded-full bg-prim py-2 my-1 w-full "
      >
        Register
      </button>
      <span className="text-slate-500">Already have an account? </span>{' '}
      <Link to="/login" className="text-primary font-semibold">
        Login now
      </Link>
    </form>
  );

  return (
    <div className="flex justify-center items-center">
      <div className=" min-w-[300px] max-w-[575px] w-full ">
        <div>{registerForm()}</div>
      </div>
    </div>
  );
};

export default Register;
