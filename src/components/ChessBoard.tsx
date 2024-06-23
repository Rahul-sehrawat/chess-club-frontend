import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

interface ChessBoardProps {
    chess: Chess;
    setBoard: React.Dispatch<React.SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    playerColor: 'w' | 'b'; 
    moveHistory: string[]; 
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ chess, board, socket, setBoard, playerColor, moveHistory }) => {
    const [from, setFrom] = useState<null | Square>(null);

    return (
        <div className="text-white-200 flex gap-10">
            <div className={`${playerColor === 'b' ? 'rotate-180' : ''}`}>
                {board.map((row, i) => {
                    return (
                        <div key={i} className="flex">
                            {row.map((square, j) => {
                                const squareRepresentation = String.fromCharCode(97 + j) + (8 - i) as Square;

                                return (
                                    <div
                                        onClick={() => {
                                            if (!from) {
                                                setFrom(squareRepresentation);
                                            } else {
                                                socket.send(JSON.stringify({
                                                    type: MOVE,
                                                    payload: {
                                                        move: {
                                                            from,
                                                            to: squareRepresentation
                                                        }
                                                    }
                                                }));
                                                setFrom(null);
                                                chess.move({
                                                    from,
                                                    to: squareRepresentation
                                                });
                                                setBoard(chess.board());
                                            }
                                        }}
                                        key={j}
                                        className={`w-16 h-16 hover:border-4 hover:bg-orange-400 ${(i + j) % 2 === 0 ? 'bg-[_rgba(119,154,88)]' : 'bg-[_rgba(234,235,200)]'}`}
                                    >
                                        <div className="w-full justify-center flex h-full">
                                            <div className={`h-full justify-center flex flex-col ${playerColor === 'b' ? 'rotate-180' : ''}`}>
                                                {square ? <img className="w-12" src={`/${square.color === "b" ? square.type : `${square.type.toUpperCase()} copy`}.png`} alt="piece" /> : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="bg-slate-900 w-full">
                <h1 className="border-2 ml-6 p-2 mt-4 w-3/4 text-white font-bold text-center text-xl mb-2 hover:bg-gray-700">Moves History</h1>
                <div className="text-white font-bold flex justify-center">
                    <ul className="list-none p-0 w-full">
                        {moveHistory.map((move, index) => (
                            index % 2 === 0 && (
                                <li key={index} className={index % 4 === 0 ? 'bg-slate-900' : 'bg-slate-600'}>
                                    <div className="flex items-center h-8 p-2">
                                        <span className="font-bold mr-4">{`${(index / 2) + 1}.`}</span>
                                        <ul className="flex list-none p-0 justify-center">
                                            <li className="m-2">{move}</li>
                                            {moveHistory[index + 1] && <li className="m-2">{moveHistory[index + 1]}</li>}
                                        </ul>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
