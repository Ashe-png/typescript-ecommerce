import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import { ICategory } from '../../functions/types';

const CategoryList = () => {
  const [categories, setcategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setcategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Link to={`/category/${c.slug}`} key={c._id} className="col">
        <div className=" btn w-100 rounded-pill btn-outline-danger m-3">
          {c.name}
        </div>
      </Link>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center text-danger">Loading..</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
