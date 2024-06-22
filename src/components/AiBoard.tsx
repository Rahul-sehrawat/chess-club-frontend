import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const AiBoard = ({ chess, board, setBoard }: {
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
}) => {
    const [from, setFrom] = useState<null | Square>(null);

    const handlePlayerMove = (to: Square) => {
        if (from) {  
            const move = chess.move({
                from,
                to,
            });

            if (move) {
                setBoard(chess.board());
                if (!chess.isGameOver()) {
                    setTimeout(() => handleComputerMove(), 500);  
                }
            } else {
                console.log("Invalid move");
            }
            setFrom(null);
        }
    };

    const handleComputerMove = () => {
        const moves = chess.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
        setBoard(chess.board());
    };

    return (
        <div className="text-white-200 flex gap-10">
            <div>
                {board.map((row, i) => (
                    <div key={i} className="flex">
                        {row.map((square, j) => {
                            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + (8 - i) as Square;

                            return (
                                <div
                                    onClick={() => {
                                        if (!from) {
                                            setFrom(squareRepresentation);
                                        } else {
                                            handlePlayerMove(squareRepresentation);
                                        }
                                    }}
                                    key={j}
                                    className={`w-16 h-16 hover:border-4 hover:bg-orange-400 ${(i + j) % 2 === 0 ? 'bg-[#779A58]' : 'bg-[#EAEBC8]'}`}
                                >
                                    <div className="w-full justify-center flex h-full">
                                        <div className="h-full justify-center flex flex-col">
                                            {square ? (
                                                <img
                                                    className="w-12"
                                                    src={`/${square.color === "b" ? square.type : `${square.type.toUpperCase()} copy`}.png`}
                                                    alt={`${square.color}${square.type}`}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
