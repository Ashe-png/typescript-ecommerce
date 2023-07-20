import { Carousel } from 'react-responsive-carousel';
import NewArrivals from '../components/home/NewArrivals';
import Brands from '../components/home/Brands';
import Featured from '../components/home/Featured';
import BestSeller from '../components/home/BestSeller';
import CurratedPicks from '../components/home/CuratedPicks';
import AdPlace from '../components/home/AdPlace';

const images = [
  'https://res.cloudinary.com/dhlr0ldmc/image/upload/v1651417845/spp_rktgtw.jpg',
  'https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197768/samples/imagecon-group.jpg',
  'https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197767/samples/landscapes/beach-boat.jpg',
];

const Home = () => {
  return (
    <div>
      <div className="w-full ss:container">
        <Carousel
          showArrows={true}
          showThumbs={false}
          dynamicHeight={false}
          autoPlay
          infiniteLoop
        >
          {images &&
            images.map((i) => (
              <img
                className="object-cover sm:h-[450px] h-[240px] lg:h-[600px] ss:rounded-xl"
                src={i}
                key={i}
              />
            ))}
        </Carousel>
      </div>

      <Brands />
      <AdPlace item={true} />
      <CurratedPicks />

      <NewArrivals />
      <Featured />
      <BestSeller />
      <AdPlace item={false} />
    </div>
  );
};
export default Home;
