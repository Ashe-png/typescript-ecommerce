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
import UserRoute from './components/routes/UserRoute';
import History from './pages/user/History';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import { currentUser } from './functions/auth';
import { AxiosResponse } from 'axios';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res: AxiosResponse) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err: any) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, []);

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
        <Route path="/user/history" element={<UserRoute />}>
          <Route path="/user/history" element={<History />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/admin/category" element={<AdminRoute />}>
          <Route path="/admin/category" element={<CategoryCreate />} />
        </Route>
        <Route path="/admin/category/:slug" element={<AdminRoute />}>
          <Route path="/admin/category/:slug" element={<CategoryUpdate />} />
        </Route>
        <Route path="/admin/sub" element={<AdminRoute />}>
          <Route path="/admin/sub" element={<SubCreate />} />
        </Route>
        <Route path="/admin/sub/:slug" element={<AdminRoute />}>
          <Route path="/admin/sub/:slug" element={<SubUpdate />} />
        </Route>
        <Route path="/admin/product" element={<AdminRoute />}>
          <Route path="/admin/product" element={<ProductCreate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
