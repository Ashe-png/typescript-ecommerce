import { Rating } from 'react-simple-star-rating';

type Props = {
  starClick: (num: string) => void;
};

const Star = ({ starClick }: Props) => {
  const handleClick = (value: number) => {
    starClick(`${value}`);
  };
  return (
    <>
      <Rating onClick={handleClick} transition fillColor="red" />
      <br />
    </>
  );
};

export default Star;
