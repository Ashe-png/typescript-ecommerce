import AdminNav from '../../components/nav/AdminNav';
// import { getOrders, changeStatus } from '../../functions/admin';

const AdminDashboard = () => {
  return (
    <div className="admindash">
      <div className="sidenav">
        <AdminNav />
      </div>

      <div className="w-full">
        <h4 className="text-center text-danger mt-4 mb-4">Admin Dashboard</h4>
      </div>
    </div>
  );
};

export default AdminDashboard;
