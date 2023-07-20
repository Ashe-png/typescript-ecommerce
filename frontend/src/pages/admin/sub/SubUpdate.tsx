import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { ICategory, getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';

import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { userState } from '../../../reducers/userReducer';

const SubUpdate = () => {
  let navigate = useNavigate();
  let { slug } = useParams();
  const { user } = useSelector((state: userState) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [parent, setParent] = useState('');

  useEffect(() => {
    loadcategories();
    loadSub();
  }, []);

  const loadcategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(slug!).then((s) => {
      setName(s.data.sub.name);
      setParent(s.data.sub.parent);
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    updateSub(slug!, { name, parent }, user!.token!)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated`);
        navigate('/admin/sub');
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
          <h4 className="text-center">Update Sub Category</h4>
        )}
        <div className="py-3 px-4 w-full space-y-3">
          <div className="flex flex-col space-y-3">
            <span className="itext-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Category
            </span>

            <select
              name="category"
              className="max-w-[172px] w-full h-9 rounded-md border border-input bg-back text-sm inputshadow "
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

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

export default SubUpdate;
