import { useState } from "react";
import { VscSend } from "react-icons/vsc";
import useSendMessage from "../../hooks/useSendMessage";



const MessageInput = () => {

  const [maessage, setMessage] = useState("");
  const {loading, sendMessage}= useSendMessage();
  
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!maessage) return;
      await sendMessage(maessage);
      setMessage("");
     }

  return (
    <form className=' px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input 
              type="text" 
              className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
              placeholder='Send a maessage....'
              value={maessage}
              onChange={(e) => setMessage(e.target.value)}
            />
        <button 
            type='submit'
            className=' absolute inset-y-0 end-0 flex items-center pe-3 text-white'    
        >
           {loading ? <span className=" loading loading-spinner"></span>:  <VscSend />}
        </button>
        </div>
    </form>
  )
}

export default MessageInput