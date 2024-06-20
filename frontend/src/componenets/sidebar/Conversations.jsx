import React from 'react'
import Converstaion from '../sidebar/Converstaion'
import useGetConversations from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const  {loading, conversations} =useGetConversations();
    
  return (
    <div className=' py-2 flex flex-col overflow-auto'>
        {conversations.map((conversation,idx) => (
          <Converstaion 
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length -1}
          />
        ))}

        {loading ? <span className=' loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations;