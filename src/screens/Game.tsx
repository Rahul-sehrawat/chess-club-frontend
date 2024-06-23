import { useEffect, useState } from "react";
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
                    setBoard(chess.board());
                    setMoveHistory(chess.history());
                    break;

                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        };
    }, [socket, chess]);

    if (!socket) return <div className="text-white font-bold">Connecting...</div>;

    return (
        <div>
            <Navbar />
            <div className="justify-center flex bg-black h-full">
                <div className="pt-2 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                        <div className="col-span-5 w-full flex justify-center flex-col">
                            <div className="text-white bottom-2 w-3/4 font-bold text-xl pb-2 flex gap-2 items-center">
                                <img src="/avatar.png" width={38} alt="avatar" />
                                <span className="text-2xl">player 2</span>
                                <span className="font-thin">{`(500)`}</span>
                            </div>
                            {playerInfo && (
                                <ChessBoard
                                    chess={chess}
                                    setBoard={setBoard}
                                    socket={socket}
                                    board={board}
                                    playerColor={playerInfo.color === 'white' ? 'w' : 'b'}
                                    moveHistory={moveHistory}
                                />
                            )}
                            <div className="text-white bottom-2 w-3/4 font-bold text-xl pt-2 flex gap-2 items-center">
                                <img src="/avatar.png" width={38} alt="avatar" />
                                <div>
                                    <span className="text-2xl mr-1">{user?.name}</span>
                                    <span className="font-thin">{`(500)`}</span>
                                </div>
                            </div>
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
    );
};
