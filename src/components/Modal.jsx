import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ children, onClose, isOpen }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className='z-40 grid place-items-center absolute top-0 h-screen w-screen backdrop-blur-sm'>
          <div className='z-30 p-4 rounded-lg bg-white w-fit sm:min-w-[400px] m-auto h-fit'>
            <div className='flex justify-end'>
              <IoCloseOutline
                onClick={onClose}
                className='text-4xl cursor-pointer text-right'
              />
            </div>
            <div>{children}</div>
          </div>
          {/*         <div
            onClick={onClose}
            className='absolute top-0 z-20 backdrop-blur-sm h-screen w-full'
          ></div> */}
        </div>
      )}
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
