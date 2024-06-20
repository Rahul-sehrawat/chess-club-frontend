import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js'
import {BoardPuzzle} from '../components/BoardPuzzle';


interface Puzzle {
  title: string;
  url: string;
  image: string;
  fen:string | any;

}

const Puzzle: React.FC = () => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [chess, setChess] = useState( new Chess());
  var chess = new Chess()
  const [board, setBoard] = useState(chess.board());
 

  
  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await fetch('https://api.chess.com/pub/puzzle/random');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: Puzzle = await response.json();
        chess.load(data.fen, { skipValidation: true })
        setBoard(chess?.board());
        setPuzzle(data);
      } catch (err:any) {
        setError(err.message);
      }
    }; 
    fetchPuzzle();
    
  }, []);

 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!puzzle) {
    return <div className=' text-white'>Loading...</div>;
  }

  return (
    <div className='flex justify-center items-end'>
      <div className='pt-12'>
            <h1 className='text-white font-bold text-4xl p-12'>Puzzle Title: {puzzle.title}</h1>
            <BoardPuzzle chess={chess} board={board} setBoard={setBoard}/>

      </div>

    </div>
  );
};

export default Puzzle;
