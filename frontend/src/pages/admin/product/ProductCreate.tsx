import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { IProduct, createProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import { userState } from '../../../reducers/userReducer';
import { ISub } from '../../../functions/sub';

const initialState = {
  title: '',
  description: '',
  price: 0,
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: 0,
  images: [],
  color: 'Black',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState<IProduct>(initialState);
  const [subOptions, setSubOptions] = useState<ISub[]>([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: userState) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createProduct(values, user!.token!)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, '------', e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    console.log('clicked category', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      //   console.log('subOption category clicked', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="admindash">
      <div className="sidenav">
        <AdminNav />
      </div>

      <div className="w-full">
        {loading ? (
          <LoadingOutlined className="flex justify-center" />
        ) : (
          <h4 className=" text-center">Product Create</h4>
        )}
        {/* {JSON.stringify(values.images)} */}
        <div className="py-3 px-4 w-full space-y-3">
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            values={values}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
