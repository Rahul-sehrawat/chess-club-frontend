import { useEffect, useState, useRef } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const MOVES_HISTORY = "moves_history";

interface PlayerInfo {
    color: 'white' | 'black';
    name: string;
}

export const Game = () => {
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    const { user } = useAuthContext();
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
    const [moveHistory, setMoveHistory] = useState<string[]>([]);
    const [gameover,setGameOver] = useState<boolean>(false)
    const [whiteTime, setWhiteTime] = useState(300); 
    const [blackTime, setBlackTime] = useState(300); 
    const whiteInterval = useRef<number | null>(null);
    const blackInterval = useRef<number | null>(null);


    const startWhiteClock = () => {
        if (blackInterval.current !== null) clearInterval(blackInterval.current);
        whiteInterval.current = window.setInterval(() => {
            setWhiteTime(prev => prev - 1);
        }, 1000);
    };

    const startBlackClock = () => {
        if (whiteInterval.current !== null) clearInterval(whiteInterval.current);
        blackInterval.current = window.setInterval(() => {
            setBlackTime(prev => prev - 1);
        }, 1000);
    };

    const pauseWhiteClock = () => {
        if (whiteInterval.current !== null) {
            clearInterval(whiteInterval.current);
            whiteInterval.current = null;
        }
    };


    const pauseBlackClock = () =>{
        if (blackInterval.current !== null) {
            clearInterval(blackInterval.current);
            blackInterval.current = null;
        }
    };


    const playSound = () => {
        const audio = new Audio('/move.wav');
        audio.play();
    };

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    const info: PlayerInfo = message.payload;
                    setPlayerInfo(info);
                    console.log("Player info:", info);
                    break;

                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    playSound();
                    setBoard(chess.board());
                    setMoveHistory(chess.history());

                    if (chess.turn() === 'w') {
                        startWhiteClock();
                        pauseBlackClock()
                    } else {
                        startBlackClock();
                        pauseWhiteClock();
                    }
                    break;

                case GAME_OVER:
                    console.log("Game over");
                    setGameOver(true)
                    if (whiteInterval.current !== null) clearInterval(whiteInterval.current);
                    if (blackInterval.current !== null) clearInterval(blackInterval.current);
                 

                    break;
            }
        };
        return () => {
            if (whiteInterval.current !== null) clearInterval(whiteInterval.current);
            if (blackInterval.current !== null) clearInterval(blackInterval.current);
        };

    }, [socket, chess]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (!socket) return <div className="text-white font-bold">Connecting...</div>;

    return (
        <div >
            <div >
            <Navbar />
            <div className="justify-center flex bg-black h-full">
                <div className="pt-2 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                        <div className="col-span-5 w-full flex justify-center flex-col">
                            
                            {playerInfo && (
                                 <>
                                 {playerInfo.color === 'white' && (   
                                     <div className="text-white flex font-bold text-xl items-end text-center mb-2">
                                         <div className="text-white bottom-2 w-1/2 font-bold text-xl  flex gap-2 items-center">
                                                <img src="/avatar.png" width={38} alt="avatar" />
                                                <span className="text-2xl">player 2</span>
                                                <span className="font-thin">{`(500)`}</span>   
                                        </div>
                                         <div className="border-2 rounded-md pl-1 pr-1 bg-gray-700" >{formatTime(blackTime)}</div>
                                     </div>
                                     )}
                                     {playerInfo.color === 'black' && (
                                        <div className="text-white flex font-bold text-xl items-end text-center mb-2">
                                            <div className="text-white bottom-2 w-1/2 font-bold text-xl  flex gap-2 items-center">
                                                    <img src="/avatar.png" width={38} alt="avatar" />
                                                    <span className="text-2xl">player 2</span>
                                                    <span className="font-thin">{`(500)`}</span>   
                                            </div>
                                            <div className="border-2 rounded-md pl-1 pr-1 bg-gray-700" >{formatTime(whiteTime)}</div>
                                        </div>
                                )}
                                   
                                <ChessBoard
                                    chess={chess}
                                    setBoard={setBoard}
                                    socket={socket}
                                    board={board}
                                    playerColor={playerInfo.color === 'white' ? 'w' : 'b'}
                                    moveHistory={moveHistory}
                                    startWhiteClock={startWhiteClock}
                                    startBlackClock={startBlackClock}
                                    pauseWhiteClock={pauseWhiteClock}
                                    pauseBlackClock={pauseBlackClock}
                                />
                                  {playerInfo.color === 'white' && (
                                    <div className="text-white flex font-bold text-xl items-end text-center mb-2">
                                    <div className="text-white bottom-2 w-1/2 font-bold text-xl  flex gap-2 items-center">
                                           <img src="/avatar.png" width={38} alt="avatar" />
                                           <span className="text-2xl">{user?.name}</span>
                                           <span className="font-thin">{`(500)`}</span>   
                                   </div>
                                    <div className="border-2 rounded-md pl-1 pr-1 bg-gray-700" >{formatTime(whiteTime)}</div>
                                </div>
                                )}
                                
                                
                                {playerInfo.color === 'black' && (
                                    <div className="text-white flex font-bold text-xl items-end text-center mb-2">
                                    <div className="text-white bottom-2 w-1/2 font-bold text-xl  flex gap-2 items-center">
                                           <img src="/avatar.png" width={38} alt="avatar" />
                                           <span className="text-2xl">{user?.name}</span>
                                           <span className="font-thin">{`(500)`}</span>   
                                   </div>
                                    <div className="border-2 rounded-md pl-1 pr-1 bg-gray-700" >{formatTime(blackTime)}</div>
                                </div>
                                )}
                            </>

                            )}
                        </div>
                        <div className="col-span-1 h-20 w-20 flex justify-center"></div>
                    </div>
                    <div className="pt-1">
                        {!started && (
                            <button
                                className="bg-gray-500 p-2 w-40 text-lg font-bold rounded-md text-white hover:text-black hover:w-44 hover:bg-green-500"
                                onClick={() => {
                                    socket.send(
                                        JSON.stringify({
                                            type: INIT_GAME,
                                        })
                                    );
                                }}
                            >
                                Find Game
                            </button>
                        )}
                    </div>
                </div>
            </div>
            </div> 
            {gameover && (
                <div className=" absolute top-11 mt-3 bg-slate-800  inset-0 flex justify-center items-center opacity-50">
                    <div className="text-white opacity-60 text-8xl">Game Over</div>
                </div>
            )}
        </div>
    );
};
