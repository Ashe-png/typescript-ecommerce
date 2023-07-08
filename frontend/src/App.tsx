import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/nav/Header';
import Home from './pages/Home';
import Register from './pages/auth/Register';
// import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import RegisterComplete from './pages/auth/RegisterComplete';
import Login from './pages/auth/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
  const dispatch = useDispatch();

  //  useEffect(() => {
  //    const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //      if (user) {
  //        const idTokenResult = await user.getIdTokenResult();
  //        currentUser(idTokenResult.token)
  //          .then((res:any) => {
  //            dispatch({
  //              type: 'LOGGED_IN_USER',
  //              payload: {
  //                name: res.data.name,
  //                email: res.data.email,
  //                token: idTokenResult.token,
  //                role: res.data.role,
  //                _id: res.data._id,
  //              },
  //            });
  //          })
  //          .catch((err:any) => console.log(err));
  //      }
  //    });
  //    return () => unsubscribe();
  //  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
