import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import {
  ICategory,
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';

import { userState } from '../../../reducers/userReducer';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
// import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const { user } = useSelector((state: userState) => ({ ...state }));
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  //searching and filtering
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    createCategory({ name }, user!.token!)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadcategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug: string) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeCategory(slug, user!.token!)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadcategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
  //step 3

  //step 4
  const searched = (keyword: string) => (c: ICategory) =>
    c.name!.toLowerCase().includes(keyword);

  return (
    <div className="admindash">
      <div className="sidenav">
        <AdminNav />
      </div>
      <div className="w-full ">
        {loading ? (
          <h4 className="text-center">Loading..</h4>
        ) : (
          <h4 className="text-center">Create Category</h4>
        )}
        <div className="flex px-4 py-3 justify-center items-center w-full">
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
        {/*step2*/}
        <div className="px-4 py-3">
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/*step5*/}

          <table className=" font-light w-full text-start ">
            <thead>
              <tr className="border-b  ">
                <th className="w-[55%] text-start">Category Name</th>
                <th className="text-start">Update</th>
                <th className="text-start">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.filter(searched(keyword)).map((c) => (
                <tr className="border-b" key={c._id}>
                  <td>{c.name}</td>
                  <td>
                    <Link to={`/admin/category/${c.slug}`}>
                      <button className="text-orange-400">
                        <FormOutlined /> Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemove(c.slug!)}
                      className="text-red-500"
                    >
                      <DeleteOutlined /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
