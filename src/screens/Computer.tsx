import React, { useState} from 'react';
import { Chess } from 'chess.js';
import { AiBoard } from '../components/AiBoard';
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from '../components/Navbar';


const Computer: React.FC = () => {
  
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const { user } = useAuthContext();

  function getName(){
    if (user){
      return user.name
    }else{
      return "Guest"
    }
  }

  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-end'>
      
      <div >
        <div className='flex pb-2 font-sans font-bold text-white items-center gap-2'>
        <img src="/bot.png " width={44}></img><span className=" text-2xl">Chess Engine</span><span className=" font-thin">{`(700 )`}</span>
        </div>
        <AiBoard chess={chess} board={board} setBoard={setBoard} />
        <div className='flex pt-2 font-bold text-white items-center gap-2'>
        <img src="/avatar.png " width={38}></img><span className=" text-2xl">{getName()}</span><span className=" font-thin">{`(500 )`}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Computer;

