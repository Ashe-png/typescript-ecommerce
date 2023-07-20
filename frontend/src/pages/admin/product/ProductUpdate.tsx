import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../../reducers';
import { getBrands } from '../../../functions/brand';
import { IProduct2, ISub, ICategory, IBrand } from '../../../functions/types';

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

const ProductUpdate = () => {
  let navigate = useNavigate();

  const [values, setValues] = useState<IProduct2>(initialState);
  const [subOptions, setSubOptions] = useState<ISub[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [arrayOfSubs, setArrayOfSubs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [descriptionFields, setDescriptionFields] = useState<string[]>([]);

  const { user } = useSelector((state: RootState) => ({ ...state }));
  let { slug } = useParams();

  useEffect(() => {
    loadProduct();
    // console.log(values);
    loadCategoriesandBrands();
  }, []);

  const loadProduct = () => {
    getProduct(slug as string).then((p) => {
      // console.log('single produt', p.data.category.name);
      //load single product
      setValues({ ...values, ...p.data, category: p.data.category._id });
      setDescriptionFields(p.data.description);
      // console.log(values);

      //load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });

      //prepare array of sub ids to show as default sub values in antd select
      let arr: string[] = [];
      p.data.subs.map((s: ISub) => {
        arr.push(s._id!);
      });
      setArrayOfSubs(arr);
    });
  };

  const loadCategoriesandBrands = () => {
    getBrands().then((b) => {
      getCategories().then((c) => {
        setBrands(b.data);
        setCategories(c.data);
      });
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(slug!, values, user!.token!)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title}  is updated`);
        navigate('/admin/products');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, '------', e.target.value);
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
  const handleDelete = (index: number) => {
    const newDescriptionFields = [...descriptionFields];
    newDescriptionFields.splice(index, 1);
    setDescriptionFields(newDescriptionFields);
    const newValues = { ...values };
    newValues.description = newDescriptionFields;
    setValues(newValues);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    // console.log('clicked category', e.target.value);
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      // console.log('subOption category clicked', res);
      setSubOptions(res.data);
    });
    //if user clicks back tothe original category so it s sub category is default
    if (values.category === e.target.value) {
      loadProduct();
    }
    //clear old category id
    setArrayOfSubs([]);
  };

  return (
    <div className="admindash">
      <div className="sidenav">
        <AdminNav />
      </div>

      <div className="adminpage">
        {loading ? (
          <LoadingOutlined className="flex justify-center" />
        ) : (
          <h4 className=" text-center">Update Product</h4>
        )}
        {/* {JSON.stringify(values)} */}
        <div className="py-3 px-4 w-full space-y-3">
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
          <br />
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleCheckChange={handleCheckChange}
            handleDescriptionChange={handleDescriptionChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            categories={categories}
            brands={brands}
            subOptions={subOptions}
            descriptionFields={descriptionFields}
            setDescriptionFields={setDescriptionFields}
            values={values}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
