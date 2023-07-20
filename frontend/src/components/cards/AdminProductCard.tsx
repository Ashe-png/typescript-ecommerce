// import laptop from '../../assets/laptop.png';
import { Link } from 'react-router-dom';
import { IProduct2 } from '../../functions/types';

// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { PencilSquare, TrashFill } from 'react-bootstrap-icons';

// const { Meta } = Card;

type Props = {
  product: IProduct2;
  handleRemove: (slug: string) => void;
};

const AdminProductCard = ({ product, handleRemove }: Props) => {
  const { title, images, slug, price } = product;

  return (
    <div className="flex flex-col ">
      <img
        src={
          images && images.length
            ? images[0].url
            : 'https://res.cloudinary.com/dhlr0ldmc/image/upload/v1645197777/cld-sample.jpg'
        }
        className="object-cover aspect-square w-full rounded-t-xl"
      />
      <div className=" py-2 px-1 ">
        <div className="flex justify-between text-xl text-bold">
          <h6 className="">{title}</h6>
          <h6 className="">Rs. {price}</h6>
        </div>

        <div className="flex justify-between mt-2 px-2">
          <Link to={`/admin/product/${slug}`}>
            <button className="inline-flex items-center justify-center rounded-full text-sm font-medium cursor-pointer h-10 px-2 py-2 text-primary-foreground bg-accenlow hover:bg-accen">
              Update Product
            </button>
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-full text-sm font-medium cursor-pointer h-10 px-2 py-2 text-primary-foreground bg-primlow hover:bg-prim"
            onClick={() => handleRemove(slug!)}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
    // <Card cover={
    //     <img
    //     src={images && images.length ? images[0].url: laptop}
    //     style={{height: '150px', objectFit:'cover'}}
    //     className="p-1"
    //     />
    // }
    // actions={[
    //     <Link to={`/admin/product/${slug}`}>
    //     <EditOutlined className="text-warning" />
    //     </Link>,
    //     <DeleteOutlined className="text-danger" onClick={()=> handleRemove(slug)} />
    // ]}
    // >
    //     <Meta title={title} description={`${description && description.substring(0, 10)}...`} />
    // </Card>
  );
};

export default AdminProductCard;
