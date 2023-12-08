import { FaSearch } from 'react-icons/fa';
import { AiFillPlusCircle } from 'react-icons/ai';

const Searchinput = ({ onOpen, filterContacts }) => {
  return (
    <div className='flex items-center gap-2 relative'>
      <FaSearch className='text-white absolute ml-2' />
      <input
        onChange={filterContacts}
        className='rounded-md flex-grow border-2 bg-transparent pl-10 h-10 w-72 text-white border-white'
        placeholder='Search Contact'
      />
      <AiFillPlusCircle
        onClick={onOpen}
        className='text-white text-6xl cursor-pointer'
      />
    </div>
  );
};

export default Searchinput;
