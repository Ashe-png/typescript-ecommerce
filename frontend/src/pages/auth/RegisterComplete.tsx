import { useState, useEffect, FormEvent } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let dispatch = useDispatch();
  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration')!);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //validation
    if (!email || !password) {
      toast.error('Email and password is required');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log("RESULT", result);
      if (result.user?.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        let user = auth.currentUser;
        await user?.updatePassword(password);
        const idTokenResult = await user?.getIdTokenResult();
        //redux store
        // console.log('user', user, 'idTokenResult', idTokenResult);
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
          })
          .catch((err) => console.log(err));
        setLoading(false);
        //redirect
        navigate('/');
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form
      className="flex flex-col shadow border-solid border-[1px] rounded p-3 my-10 justify-center items-center"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <h3 className="text-center text-red-600 pb-7 ">Loading</h3>
      ) : (
        <h3 className="text-center pb-7 ">Register Complete</h3>
      )}
      <input
        type="email"
        className="border border-zinc-300 bg-back rounded-2xl mb-5 p-1.5 w-[95%]"
        value={email}
        disabled
      />
      <input
        type="password"
        className="border border-zinc-300 bg-back rounded-2xl focus:outline-none focus:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] focus:shadow-prim  p-1.5 w-[95%]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button
        type="submit"
        className="outline-none border-solid text-white rounded-full bg-prim py-2 my-1 w-full "
      >
        Register Complete
      </button>
    </form>
  );

  return (
    <div className="flex justify-center items-center">
      <div className=" min-w-[300px] max-w-[575px] w-full  ">
        <div>{completeRegistrationForm()}</div>
      </div>
    </div>
  );
};

export default RegisterComplete;
