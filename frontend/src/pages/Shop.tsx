import { useState, useEffect } from 'react';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio, MenuProps, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';
import { RootState } from '../reducers';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { getBrands } from '../functions/brand';
import Search from '../components/forms/Search';
import { IProduct, ICategory, IBrand, ISub } from '../functions/types';

const Shop = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<[number, number]>([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  const [collapsed, setCollapsed] = useState(false);

  const [subs, setSubs] = useState<ISub[]>([]);
  const [sub, setSub] = useState('');
  const [brand, setBrand] = useState('');
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const [color, setColor] = useState('');

  let dispatch = useDispatch();

  let { search } = useSelector((state: RootState) => ({ ...state }));
  const { text } = search;

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    loadAllProducts();
    //fetch categories
    getCategories().then((res) => setCategories(res.data));
    getBrands().then((res) => setBrands(res.data));
    //fetch subs
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //1.load prodcuts by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchProducts = (arg: any) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };
  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    // console.log('load products on user search input', text);
    return () => clearTimeout(delayed);
  }, [text]);

  //3. load producs based on price
  useEffect(() => {
    // console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value: [number, number]) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    if (value[0] === 0 && value[1] === 0) {
      setPrice([0, 200000]);
    } else {
      setPrice(value);
    }
    //reset
    setCategoryIds([]);
    setPrice(value);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pt-2 pe-4 ps-4 text-[1.1rem] font-poppins font-medium"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id!)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  //handleCheck for categories
  const handleCheck = (e: CheckboxChangeEvent) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    // setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');

    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); //index or -1

    //indexOf method ?? if not found returns -1 else returns index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      //if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  //5. show product by star rating
  const handleStarClick = (num: string) => {
    // console.log(num);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub('');
    setStar(num);
    setBrand('');
    setColor('');

    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="">
      <Star starClick={handleStarClick} />
    </div>
  );

  //6. show prodcuts by sub category

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s._id!)}
        className={`${
          sub === s._id ? 'bg-black text-white' : 'bg-white text-black'
        } my-2 mx-2  pe-4 ps-4 text-[1.075rem] hover:bg-black hover:text-white transition-all duration-300 font-poppins font-medium outline outline-1 rounded-full`}
        style={{ cursor: 'pointer' }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub: string) => {
    // console.log('sub', sub);
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub(sub);
    setBrand('');
    setColor('');

    fetchProducts({ sub: sub });
  };

  //7. show products based on brands
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b.name}
        key={b._id}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-2 pt-2 pe-4 ps-4 text-[1.1rem] font-poppins font-medium"
      >
        {b.name}
      </Radio>
    ));

  const handleBrand = (e: any) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand(e.target.value);
    setColor('');

    fetchProducts({ brand: e.target.value });
  };

  //8. show products based on color

  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        key={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pe-4 ps-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e: any) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    // setSub('');
    setBrand('');
    setColor(e.target.value);

    fetchProducts({ color: e.target.value });
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="vs:hidden">
          <Search />
        </div>
      ),
      key: '8',
    },
    {
      label: 'Price',
      key: '1',
      children: [
        {
          type: 'group',
          label: (
            <div>
              <Slider
                className="me-4 ms-4  "
                tooltip={{ formatter: (v) => `Rs.${v}` }}
                range
                value={price}
                onChange={handleSlider}
                max={200000}
              />
            </div>
          ),
        },
      ],
    },
    {
      label: 'Brands',
      key: '2',
      children: [
        {
          type: 'group',
          label: showBrands(),
        },
      ],
    },
    {
      label: 'Categories',
      key: '3',
      children: [
        {
          type: 'group',
          label: showCategories(),
        },
      ],
    },
    {
      label: 'Sub Categories',
      key: '4',
      children: [
        {
          type: 'group',
          label: <div className="flex flex-row flex-wrap">{showSubs()}</div>,
        },
      ],
    },
    {
      label: 'Color',
      key: '5',
      children: [
        {
          type: 'group',
          label: showColors(),
        },
      ],
    },
    {
      label: 'Ratings',
      key: '6',
      children: [
        {
          type: 'group',
          label: <div style={{ paddingLeft: '-10px' }}>{showStars()}</div>,
        },
      ],
    },
  ];

  return (
    <div className="ss:container ">
      <div className=" relative flex flex-row">
        <Button
          type="ghost"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
          className="absolute sm:hidden bg-prim text-primary-foreground z-20 max-ss:left-[6%]"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <div
          className={` ${
            collapsed
              ? 'hidden'
              : 'max-sm:absolute max-sm:z-10 max-ss:left-[6%] max-sm:bg-white'
          }  w-[350px] `}
        >
          <h5 className="max-sm:hidden text-center text-xl font-poppins">
            Search/Filter
          </h5>
          <hr />

          <Menu
            className="h-[755px] overflow-y-scroll bg-transparent outline outline-1  outline-input font-poppins text-lg font-medium  rounded-lg p-3 pt-5"
            defaultOpenKeys={['1', '2', '3', '4']}
            inlineCollapsed={collapsed}
            mode="inline"
            items={items}
          />
          {/* Price */}
        </div>

        <div className="xl:ml-16 max-as:mx-8 max-sm:mx-2  ml-4 w-full">
          {loading ? (
            <h4 className="text-danger ms-5">Loading..</h4>
          ) : (
            <h4 className=" text-center font-poppins text-2xl">Products</h4>
          )}

          <div className="grid grid-cols-2 mt-4 gap-4 as:grid-cols-3 xl:grid-cols-3 justify-center items-center ">
            {products.map((p) => (
              <div
                key={p._id}
                className=" flex justify-center items-center rounded-xl"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
