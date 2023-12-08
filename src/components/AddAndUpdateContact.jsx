import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from './Modal';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const AddAndUpdateContact = ({
  isOpen,
  onClose,
  isUpdate,
  contactsData,
  isLoading,
}) => {
  // Add contact to data base
  const addContact = async (contact) => {
    try {
      isLoading(true);
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact);
      toast.success('Contact added successfully');
      isLoading(false);
      onClose();
    } catch (error) {
      toast.success(error);
      console.log(error);
    }
  };

  // Update contact to data base
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, contact);
      toast.success('Contact updated successfully');
      onClose();
    } catch (error) {
      toast.success(error);
      onClose();
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contactsData.name,
                  email: contactsData.email,
                }
              : {
                  name: '',
                  email: '',
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate
              ? updateContact(values, contactsData.id)
              : addContact(values);
          }}
        >
          <Form className='px-2 py-3'>
            <div className='flex flex-col gap-2 my-2'>
              <label htmlFor='name'>Name</label>
              <Field
                name='name'
                placeholder='Enter name'
                className='outline-none border-2 border-gray-500 rounded-lg pl-2'
              />
              <div className='text-red-500 text-sm'>
                <ErrorMessage name='name' />
              </div>
            </div>
            <div className='flex flex-col gap-2 my-2'>
              <label htmlFor='name'>Email</label>
              <Field
                name='email'
                placeholder='Enter email'
                className='outline-none border-2 border-gray-500 rounded-lg pl-2'
              />
              <div className='text-red-500 text-sm'>
                <ErrorMessage name='email' />
              </div>
            </div>

            <button className='bg-orange-400 px-3 py-1.5 border border-black my-2'>
              {isUpdate ? 'Update' : 'Add'} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
