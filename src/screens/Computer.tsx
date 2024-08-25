import React, { useState} from 'react';
import { Chess } from 'chess.js';
import { AiBoard } from '../components/AiBoard';
import { useAuthContext } from '../hooks/useAuthContext'
import Navbar from '../components/Navbar';

const themes = [
  { name: 'Green', color1: '#769656', color2: '#eeeed2' },
  { name: 'Classic', color1: '#d18b47', color2: '#ffce9e' },
  { name: 'Gray', color1: '#808080', color2: '#d3d3d3' },
  { name: 'Red', color1: '#d32f2f', color2: '#ffcdd2' },
  { name: 'Purple', color1: '#7e57c2', color2: '#e1bee7' },
  { name: 'Orange', color1: '#ff7043', color2: '#ffe0b2' },
  { name: 'Teal', color1: '#00897b', color2: '#b2dfdb' },
  { name: 'Brown', color1: '#8d6e63', color2: '#d7ccc8' },
  { name: 'Navy', color1: '#3949ab', color2: '#c5cae9' },
  { name: 'Earth', color1: '#6b4423', color2: '#f0e68c' },

];


const Computer: React.FC = () => {
  
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const { user } = useAuthContext();
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  

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
    <div className='flex justify-center items-start gap-10'>
    <div className='pb-4 mt-8 '>
        <label className="text-white font-bold mr-2">Theme:</label>
        <select
            className="p-2 rounded bg-gray-800 text-white"
            value={selectedTheme.name}
            onChange={(e) => {
                const theme = themes.find(t => t.name === e.target.value);
                if (theme) {
                    setSelectedTheme(theme);
                    console.log(`theme is`,theme)
                }
            }}
        >
            {themes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                    {theme.name}
                </option>
            ))}
        </select>
    </div>
      
      <div >
        <div className='flex pb-2 font-sans font-bold text-white items-center gap-2'>
        <img src="/bot.png " width={44}></img><span className=" text-2xl">Chess Engine</span><span className=" font-thin">{`(700 )`}</span>
        </div>
        <AiBoard chess={chess} board={board} setBoard={setBoard} color1={selectedTheme.color1} color2={selectedTheme.color2} />
        <div className='flex pt-2 font-bold text-white items-center gap-2'>
        <img src="/avatar.png " width={38}></img><span className=" text-2xl">{getName()}</span><span className=" font-thin">{`(500 )`}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Computer;


