import { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import LocalSearch from '../../../components/forms/LocalSearch';
import { RootState } from '../../../reducers';
import { IProduct2 } from '../../../functions/types';

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct2[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug: string) => {
    let answer = window.confirm('delete?');
    if (answer) {
      //console.log('send delete request', slug);
      removeProduct(slug, user!.token!)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  const searched = (keyword: string) => (p: IProduct2) =>
    p.title!.toLowerCase().includes(keyword);

  return (
    <div className="admindash">
      <div className="sidenav">
        <AdminNav />
      </div>

      <div className="adminpage">
        {loading ? (
          <h4 className="text-danger text-center">Loading</h4>
        ) : (
          <h4 className="text-center text-danger">All Products</h4>
        )}
        <div className="ss:ml-3 mt-4">
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ss:ml-3 mt-4 ">
          {products.filter(searched(keyword)).map((product) => (
            <div
              key={product._id}
              className=" bg-cardbg rounded-xl min-w-[120px] max-w-[303px] "
            >
              <AdminProductCard product={product} handleRemove={handleRemove} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
