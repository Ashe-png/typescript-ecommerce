// import { Link } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';

const links = [
  { title: 'Dashboard', link: '/admin/dashboard' },
  { title: 'Create Product', link: '/admin/product' },
  { title: 'View Products', link: '/admin/products' },
  { title: 'Category', link: '/admin/category' },
  { title: 'Sub Category', link: '/admin/sub' },
  { title: 'Password', link: '/user/password' },
];

const AdminNav = () => {
  let location = useLocation();

  return (
    <nav>
      <ul className=" flex flex-col w-full">
        {links.map((filter, index) => (
          <Link
            to={filter.link}
            key={index}
            className={`${
              location.pathname === filter.link
                ? 'font-extrabold'
                : 'font-normal'
            } px-4 py-1 mb-2 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
