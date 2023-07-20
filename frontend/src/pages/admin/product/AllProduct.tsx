import { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { IProduct, getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { userState } from '../../../reducers/userReducer';

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state: userState) => ({ ...state }));

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col p-5">
          {loading ? (
            <h4 className="text-danger text-center">Loading</h4>
          ) : (
            <h4 className="text-center text-danger">All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
