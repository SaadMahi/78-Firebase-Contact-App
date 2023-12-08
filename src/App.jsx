import { db } from './config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import Contactslist from './components/Contactslist';
import PageNotFound from './components/PageNotFound';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import Spinner from './components/Spinner';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclouse();
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getContact = async () => {
      try {
        isLoading(true);
        const contactsRef = collection(db, 'contacts');

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          isLoading(false);
          return contactLists;
        });
      } catch (error) {
        toast.error(error);
      }
    };

    getContact();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, 'contacts');

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className='max-w-[370px] mx-auto'>
        <Navbar onOpen={onOpen} filterContacts={filterContacts} />

        {contacts.length <= 0 ? (
          <PageNotFound />
        ) : (
          contacts?.map((contacts) => (
            <Contactslist
              key={contacts.id}
              data={contacts}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
      <AddAndUpdateContact
        onClose={onClose}
        isOpen={isOpen}
        isLoading={isLoading}
      />
      <ToastContainer position='bottom-center' />
      {loading && <Spinner />}
    </>
  );
};

// prettier.config.cjs
export default App;
