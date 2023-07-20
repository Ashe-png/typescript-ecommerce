import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { getBrand, updateBrand } from '../../../functions/brand';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { RootState } from '../../../reducers';

const BrandUpdate = () => {
  let navigate = useNavigate();
  const { user } = useSelector((state: RootState) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  let { slug } = useParams();
  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = () =>
    getBrand(slug!).then((c) => {
      setName(c.data.brand.name);
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    updateBrand(slug!, { name }, user!.token!)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/brand');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="admindash">
      <div className="sidenav">
        <AdminNav />
      </div>
      <div className="w-full ">
        {loading ? (
          <h4 className="text-center">Loading..</h4>
        ) : (
          <h4 className="text-center">Update Brand</h4>
        )}
        <div className="flex justify-center items-center w-full">
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
        {/*step2*/}
      </div>
    </div>
  );
};

export default BrandUpdate;
