import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { userState } from '../../reducers/userReducer';

const UserRoute = () => {
  const { user } = useSelector((state: userState) => ({ ...state }));

  return user && user.token ? <Outlet /> : <LoadingToRedirect />;
};

export default UserRoute;
