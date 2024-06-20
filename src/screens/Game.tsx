import { useEffect, useState } from "react";
import { PlayButton } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket";
import { Chess } from 'chess.js'
import { useAuthContext } from '../hooks/useAuthContext'


// TODO: Move together, there's code repetition here
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const MOVES_HISTORY = 'moves_history';

export const Game = () => {
    const socket = useSocket();
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false)
    const { user } = useAuthContext()
    
    console.log(user)
    

    useEffect(() => {
        if (!socket) {
            return;
        }
        

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true)
                    console.log('game shown');
                    console.log(user?.email)
                    const color = message.payload
                    console.log("color is",color)
                    break;

                

                case MOVE:
                    const move = message.payload;
                    console.log("rahul" ,move);
                    console.log("seh",move)
                    chess.move(move);
                    setBoard(chess.board());
                    
                    break;

                case GAME_OVER:
                    console.log("Game over");
                    break;
                 
            }
                   
        }
        
    }, );

   

    if (!socket) return <div className="text-white font-bold">Connecting...</div>

    return <div className="justify-center flex   h-full ">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className=" col-span-5 w-full flex justify-center flex-col">
                    <div className="text-white bottom-2 w-3/4 font-bold text-xl pb-2 flex gap-2 items-center"><img src="/avatar.png " width={40}></img><span className=" text-3xl">player 2</span><span className=" font-thin">{`(500 )`}</span></div>
                    <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
                    <div className="text-white bottom-2 w-3/4 font-bold text-xl pt-2 flex gap-2 items-center"><img src="/avatar.png " width={40}></img><span className=" text-3xl">{user?.name}</span><span className=" font-thin">{`(500 )`}</span></div>
                </div>
                <div className="col-span-1 h-20  w-20 flex justify-center">
                    <div className="pt-8">
                        {!started && <PlayButton onClick={() => {
                            socket.send(JSON.stringify({
                                type: INIT_GAME
                            }))
                        }} >
                            Play
                        </PlayButton>}
                    </div>
                      
                   
                </div>
            </div>
        </div>
    </div>
}