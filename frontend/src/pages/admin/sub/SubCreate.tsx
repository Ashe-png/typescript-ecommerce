import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { createSub, removeSub, getSubs } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
// import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { RootState } from '../../../reducers';
import BrandImage from '../../../components/forms/BrandImage';
import { ISub, ICategory } from '../../../functions/types';

const SubCreate = () => {
  const { user } = useSelector((state: RootState) => ({ ...state }));
  const [name, setName] = useState('');
  const [values, setValues] = useState<ISub>({});

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState<ISub[]>([]);
  //searching and filtering
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadcategories();
    loadSubs();
  }, []);

  const loadcategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    createSub({ name, parent: category, ...values }, user!.token!)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
      removeSub(slug, user!.token!)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
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
  const searched = (keyword: string) => (c: ISub) =>
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
          <h4 className="text-center">Create SubCategory</h4>
        )}
        <div className="py-3 px-4 w-full space-y-3">
          <div className="flex flex-col space-y-3">
            <span className="itext-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Category
            </span>

            <select
              name="category"
              className="max-w-[172px] w-full h-9 rounded-md border border-input bg-back text-sm inputshadow "
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <BrandImage
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />

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
                <th className="w-[55%] text-start">Sub Category Name</th>
                <th className="text-start">Update</th>
                <th className="text-start">Delete</th>
              </tr>
            </thead>
            <tbody>
              {subs.filter(searched(keyword)).map((s) => (
                <tr className="border-b" key={s._id}>
                  <td>{s.name}</td>
                  <td>
                    <Link to={`/admin/sub/${s.slug}`}>
                      <button className="text-orange-400">
                        <FormOutlined /> Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemove(s.slug!)}
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

export default SubCreate;
