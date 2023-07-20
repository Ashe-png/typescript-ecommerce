import { useEffect, useState } from 'react';
import { getBrands } from '../../functions/brand';

// import LoadingCard from '../cards/LoadingCard';

import { Link } from 'react-router-dom';
import { IBrand } from '../../functions/types';

const Brands = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllBrands();
  }, []);

  const loadAllBrands = () => {
    setLoading(true);
    //sort, order, limit
    getBrands().then((res) => {
      setBrands(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="my-3 ss:container">
      <div className="font-poppins font-[550] -tracking-[0.04em] text-3xl my-9 ss:ml-0 ml-4">
        Brands
      </div>
      {loading ? (
        <div>Loaaing</div>
      ) : (
        <div className="flex flex-wrap justify-center items-center ">
          {brands
            .filter((item) => item.name !== 'NoBrand')
            .map((brand) => (
              <div
                key={brand._id}
                className="flex-1 max-w-[150px] hover:max-w-[158px] transition-all duration-300 min-w-[120px] m-4 flex justify-center items-center"
              >
                <Link to={`/brand/${brand.slug}`}>
                  <img
                    className="object-cover rounded-xl ss:w-[150px] hover:max-w-[158px] hover:w-[158px] transition-all duration-300 aspect-square"
                    src={brand.image?.url}
                  />
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Brands;
