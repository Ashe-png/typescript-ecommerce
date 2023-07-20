import { Link } from 'react-router-dom';
import react from '../../assets/react.svg';

const Footer = () => {
  return (
    <footer className="flex border-y font-poppins text-base border-solid flex-col justify-center items-center container mt-auto  ">
      <div className="flex justify-between items-start flex-wrap flex-row w-full text-left mt-8 [&_p]:text-gray-500 [&_p]:font-medium">
        <div className="flex min-w-[200px] flex-start flex-col mt-8">
          <img src={react} className="w-[50px] h-[50px]" />
          <p> World Vision Enterprises </p>
          <a href="https://goo.gl/maps/yZxVftKfcZXrwuR4A">
            <p className="mt-3">Find us on Map</p>
          </a>
        </div>
        <div className="flex min-w-[200px] flex-start flex-col mt-8">
          <h4 className="text-lg">Links</h4>
          <Link to="/">
            <p>Home page</p>
          </Link>
          <a href="https://www.facebook.com/worldvisionenterprises">
            <p>Social Media</p>
          </a>

          <p>Contact Us</p>
        </div>
        <div className="flex min-w-[200px] flex-start flex-col mt-8">
          <h4 className="text-lg">Shop</h4>
          <p>Home Appliances</p>
          <p>Kitchen Appliances</p>
          <p>Computer & Laptop</p>
        </div>
        <div className="flex min-w-[200px] flex-start flex-col mt-8">
          <h4 className="text-lg">Get in touch</h4>
          <p>Suryabinayak Chowk, Bhaktapur, Nepal</p>
          <p>01-6666666</p>

          <p>worldvision.enterprises@gmail.com</p>
        </div>
      </div>

      <div className="mt-[4rem] text-center w-full">
        <p className="font-poppins text-sm text-gray-400">
          Copyright &copy; 2023 World Vision Enterprises. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
