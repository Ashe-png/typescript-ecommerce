import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';
import { RootState } from '../../reducers';

const AdminRoute = () => {
  const { user } = useSelector((state: RootState) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => {
          //   console.log('Current Admin res', res);
          setOk(true);
        })
        .catch(() => {
          //   console.log('Admin route err', err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
