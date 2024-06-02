import React from 'react'
import Converstaion from '../sidebar/Converstaion'

const Conversations = () => {
  return (
    <div className=' py-2 flex flex-col overflow-auto'>
        <Converstaion/>
        <Converstaion/>
        <Converstaion/>
        <Converstaion/>
        <Converstaion/>
        <Converstaion/>
    </div>
  )
}

export default Conversations;