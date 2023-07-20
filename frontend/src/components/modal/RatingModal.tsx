import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../reducers';

const RatingModal = ({ children }: any) => {
  const { user } = useSelector((state: RootState) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let navigate = useNavigate();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate('/login', {
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div
        className="inline-flex font-poppins items-center mb-4 justify-center rounded-full outline outline-1 text-base max-w-[275px] lg:w-[65%] font-medium cursor-pointer h-10 px-2 py-2 hover:w-[67%] outline-seconhigh text-black bg-seconhigh transition-all duration-500"
        onClick={handleModal}
      >
        {user ? 'Leave Rating' : 'Login to leave rating'}
      </div>
      <Modal
        title="Leave your rating"
        open={modalVisible}
        okType="default"
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your review. It will appear soon');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
