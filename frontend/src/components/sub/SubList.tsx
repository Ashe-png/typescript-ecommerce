import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';
import { ISub } from '../../functions/types';

const SubList = () => {
  const [subs, setSubs] = useState<ISub[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      // <div className='col btn btn-outline-primary btn-lg m-3'>
      //     <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      // </div>
      <Link to={`/sub/${s.slug}`} key={s._id} className="col">
        <div className=" btn w-100 rounded-pill btn-outline-danger m-3">
          {s.name}
        </div>
      </Link>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading..</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
