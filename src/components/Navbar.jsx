import Searchinput from './SearchInput';

const Navbar = ({ onOpen, filterContacts }) => {
  return (
    <>
      <nav className='flex justify-center items-center gap-2 text-xl bg-white h-14 rounded-lg my-4'>
        <img src='/images/logos_firebase.png' />
        <h1 className='font-semibold'>Firebase Contact App</h1>
      </nav>
      <Searchinput filterContacts={filterContacts} onOpen={onOpen} />
    </>
  );
};

export default Navbar;
