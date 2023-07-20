import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { RootState } from '../../reducers';

const UserRoute = () => {
  const { user } = useSelector((state: RootState) => ({ ...state }));

  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default UserRoute;
