
import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { Button } from "../components/PlayButton";

const Home: React.FC = () => {
  const { user } = useAuthContext();
  let name = user?.email as string
  const navigate = useNavigate();
  return (<div className=' homepagediv bg-slate-500'> 
     {/* <Link className='text-white' to= '/computer'>computer
     </Link>
     <Link className='text-white' to= '/game'>game
     </Link>
     <Link className='text-white' to= '/puzzle'>puzzle
     </Link> */}



<div className=" w-full h-full flex justify-center items-start pt-12   " style={{backgroundImage: "url('/hbg.png')",}}>
            <div className=" border-black bg-black bg-opacity-70 border-4 h-5/6 w-4/5  rounded-xl flex justify-start p-12   ">
                <div>
                    <div className="  max-w-1/2  ">
                        <img src={"/gb.png"} className=" w-4/6 rounded-xl " />
                    </div>
                    
                </div>
                <div className="" >
                        <h1 className=" text-4xl font-bold text-white">Play Chess Online </h1>
                        <div className="flex gap-12">
                        <h2 className="text-white pt-8 font-bold">-- Games Today</h2>
                        <h2 className="text-white pt-8 font-bold">-- Playing Now</h2>
                        </div>
                        <div className=" pl-2 pt-12 ">
                        <Button onClick={() => {
                                navigate("/game")
                            }} >
                                ♟️ Play Online 
                        </Button>
                        </div>  
                        <div className=" pl-2 pt-12  ">
                        <Button  onClick={() => {
                                navigate("/computer")
                            }} >
                                🤖 Play Computer 
                        </Button>
                        </div>  
                        <div className=" pl-2 pt-12  ">
                        <Button  onClick={() => {
                                navigate("/puzzle")
                            }} >
                                🧩 Puzzles 
                        </Button>
                        </div>  
                        
                </div>

            </div>
           
    </div>
  </div>
    
  );
};

export default Home;
