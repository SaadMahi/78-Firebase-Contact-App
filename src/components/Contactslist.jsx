import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { FaRegUserCircle } from 'react-icons/fa';
import { RiEditCircleLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

const Contactslist = ({ data, isLoading }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  // Delete contact from data base
  const deleteContact = async (id) => {
    try {
      isLoading(true);
      await deleteDoc(doc(db, 'contacts', id));
      isLoading(false);
      toast.success('Contact deleted successfully');
    } catch (error) {
      toast.success(error);
    }
  };
  // //console.log(contactsData);
  return (
    <>
      <div
        key={data.id}
        className='flex my-4 items-center justify-between px-3 bg-[#FFEAAE] h-16 rounded-lg'
      >
        <div className='flex'>
          <FaRegUserCircle className='text-5xl text-yellow-600' />
          <div className='pl-2'>
            <h1 className='font-bold'>{data.name}</h1>
            <p className='font-medium text-sm'>{data.email}</p>
          </div>
        </div>

        <div className='flex gap-1'>
          <RiEditCircleLine
            onClick={onOpen}
            className='text-4xl cursor-pointer'
          />
          <MdDelete
            onClick={() => deleteContact(data.id)}
            className='text-4xl text-purple-700 cursor-pointer'
          />
        </div>
      </div>

      <AddAndUpdateContact
        contactsData={data}
        isOpen={isOpen}
        onClose={onClose}
        isUpdate
      />
    </>
  );
};

export default Contactslist;
