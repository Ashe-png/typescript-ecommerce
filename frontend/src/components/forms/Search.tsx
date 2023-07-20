import { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { RootState } from '../../reducers';

const Search = () => {
  let dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => ({ ...state }));
  const { text } = search;

  let navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <>
      <form className="relative ">
        <input
          type="search"
          className="border border-input bg-input  rounded-lg focus:outline-none  p-1 pl-8 "
          onChange={handleChange}
          value={text}
          placeholder="Search"
        />
        <span className="input-group-text border-0" id="search-addon">
          <button
            className="text-gray-500 absolute left-2"
            style={{ cursor: 'pointer' }}
            onClick={handleSubmit}
          >
            <SearchOutlined />
          </button>
        </span>
      </form>

      {/* <form className="d-flex w-auto" onSubmit={handleSubmit}>
            <input className="form-control mt-1"
                onChange={handleChange}
                type='search' 
                value={text}  
                placeholder='Search'
                aria-label="Search"/>
            <button class="btn btn-outline-danger me-2" onClick={handleSubmit} >Search</button>
        </form> */}
    </>
  );
};

export default Search;
