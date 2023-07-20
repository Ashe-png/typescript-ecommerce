import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

import { RootState } from '../../../reducers';
import { getBrands } from '../../../functions/brand';
import { IProduct2, ISub } from '../../../functions/types';

const initialState = {
  title: '',
  description: [],
  price: 0,
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: 0,
  images: [],
  color: 'Black',
  brands: [],
  brand: '',
  news: false,
  featured: false,
  bestseller: false,
};

const ProductCreate = () => {
  const [values, setValues] = useState<IProduct2>(initialState);
  const [subOptions, setSubOptions] = useState<ISub[]>([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [descriptionFields, setDescriptionFields] = useState<string[]>([]);

  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    loadCategoriesandBrands();
  }, []);

  const loadCategoriesandBrands = () => {
    getBrands().then((b) => {
      getCategories().then((c) => {
        setValues({ ...values, categories: c.data, brands: b.data });
      });
    });
  };

  const handleDelete = (index: number) => {
    const newDescriptionFields = [...descriptionFields];
    newDescriptionFields.splice(index, 1);
    setDescriptionFields(newDescriptionFields);
    const newValues = { ...values };
    newValues.description = newDescriptionFields;
    setValues(newValues);
  };

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
  };

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const handleDescriptionChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(e);
    const newValues = { ...values };
    const newDescription = newValues.description;
    newDescription![index] = e.target.value;
    newValues.description = newDescription;
    setValues(newValues);
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
            handleDelete={handleDelete}
            handleCheckChange={handleCheckChange}
            handleDescriptionChange={handleDescriptionChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            descriptionFields={descriptionFields}
            setDescriptionFields={setDescriptionFields}
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
