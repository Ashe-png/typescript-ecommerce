import { useEffect, useState } from 'react';
import { getCategory } from '../../functions/category';

import { getSub } from '../../functions/sub';
import { Link } from 'react-router-dom';
import { ISub } from '../../functions/types';

// import LoadingCard from '../cards/LoadingCard';

const CurratedPicks = () => {
  const [loading, setLoading] = useState(false);
  const [picks, setPicks] = useState<ISub[]>([]);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = () => {
    setLoading(true);
    let pick: ISub[] = [];
    //sort, order, limit
    getSub('building').then((res) => {
      pick.push(res.data.sub);
      getSub('random').then((res) => {
        pick.push(res.data.sub);
        getCategory('senna').then((res) => {
          pick.push(res.data.category);
          setPicks(pick);
        });
      });
    });

    setLoading(false);
  };

  return (
    <div className="my-3 ss:container ">
      <div className="font-poppins font-[550] -tracking-[0.04em] text-3xl mt-9 mb-4 ss:ml-0 ml-4">
        Currated Picks
      </div>

      {loading ? (
        <div>Loaaing</div>
      ) : (
        // <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-center ">
        <div className="flex flex-wrap justify-center items-center ">
          {picks.map((product) => (
            <div
              key={product._id}
              className="flex-1 relative max-w-[295px] max-xl:max-w-[250px] max-md:max-w-[202px] max-vs:max-w-[128px] max-sm:max-w-[150px] min-w-[120px]   m-4 flex justify-center items-center"
            >
              <img
                className="object-cover rounded-xl aspect-square"
                src={product.image?.url}
              />
              <Link
                to={`${
                  product.parent
                    ? `/sub/${product.slug}`
                    : `/category/${product.slug}`
                }`}
                type="button"
                className="absolute bottom-4 w-[80%] hover:w-[87%] hover:h-[3.75rem] hover:text-xl ease-in duration-300 max-sss:py-1 bg-white font-poppins inline-flex items-center justify-between rounded-lg text-lg px-3 h-[3.45rem] "
              >
                <div>Shop {product.name}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurratedPicks;
