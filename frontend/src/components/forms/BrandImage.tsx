import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { ChangeEvent } from 'react';
import { RootState } from '../../reducers';
import { IBrand, ICategory, ISub } from '../../functions/types';

type Props = {
  setValues: React.Dispatch<React.SetStateAction<IBrand>>;
  values: IBrand | ICategory | ISub;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const FileUpload = ({ values, setValues, setLoading }: Props) => {
  const { user } = useSelector((state: RootState) => ({ ...state }));

  const fileUploadAndResize = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    //resize
    let files = e.target.files;
    let allUploadedFiles = values.image;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${import.meta.env.VITE_REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log('Image upload res data', res);
                setLoading(false);
                // res.data.index= i;
                // console.log(res.data);
                // console.log(i);
                allUploadedFiles = res.data;
                setValues({ ...values, image: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log(`Cloudinary upload error`, err);
              });
          },
          'base64'
        );
      }
    }
    //send back to server to upload to cloudinary
    //set url to images[] in the parent component state- ProductCreate
  };

  const handleImageRemove = (public_id: string) => {
    setLoading(true);
    //console.log('remove image',public_id);
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then(() => {
        setLoading(false);

        setValues({ ...values, image: undefined });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-row gap-4 flex-wrap">
        {values.image && (
          <div key={values.image.public_id}>
            <Avatar
              src={values.image.url}
              shape="square"
              size={100}
              className=""
            />
            <div className="flex justify-center items-center">
              <button
                className="inline-flex items-center justify-center rounded-md font-normal text-primary-foreground cursor-pointer h-6 px-2 py-1 mt-2 hover:bg-primhigh bg-prim"
                onClick={() => handleImageRemove(values.image!.public_id)}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="row mt-4">
        <label className="btn bg-accenlow text-primary-foreground hover:bg-accen ">
          Choose file
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
