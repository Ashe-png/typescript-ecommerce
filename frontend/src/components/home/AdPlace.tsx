type Props = {
  item: boolean;
};

const AdPlace = ({ item }: Props) => {
  return (
    <div className="w-full ss:container">
      {item === true ? (
        <img
          className="max-h-[390px] object-cover w-full rounded-lg"
          src={`https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197765/samples/landscapes/architecture-signs.jpg`}
        />
      ) : (
        <img
          className="max-h-[390px] object-cover w-full mt-10  mb-12 rounded-lg"
          src={`https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197772/samples/landscapes/landscape-panorama.jpg`}
        />
      )}
    </div>
  );
};
export default AdPlace;
