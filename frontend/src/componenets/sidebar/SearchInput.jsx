import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch ] = useState("")
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3 ){
      toast.error('Search term must be at least 3 characters long.')
    }

    const conversation = conversations.find((convo) => convo.fullname.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch('');
    }else{
      toast.error("User is not found")
    }
  }
  return (
    <form onSubmit={handleSubmit} className=' flex items-center gap-2'>
        <input 
          type='text' 
          placeholder='Search...' 
          className='input input-bordered rounded-full' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-400 text-white'>
            <FaSearch className=' w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput;

//  STATRTER CODE FOR SEARCHINPUT
// export default SearchInput;


// import React from 'react'
// import { FaSearch } from "react-icons/fa";


// const SearchInput = () => {
//   return (
//     <form className=' flex items-center gap-2'>
//         <input type='text' placeholder='Search...' className='input input-bordered rounded-full' />
//         <button type='submit' className='btn btn-circle bg-sky-400 text-white'>
//             <FaSearch className=' w-6 h-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput