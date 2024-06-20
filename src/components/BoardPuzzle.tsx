import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";


export const BoardPuzzle = ({ chess, board, setBoard  }: {
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
}) =>{
    const [from, setFrom] = useState<null | Square>(null);

    

    return <div className="text-white-200">
    {board.map((row, i) => {
        return <div key={i} className="flex">
            {row.map((square, j) => {
                const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;

                return <div onClick={() => {
                    if (!from) {
                        setFrom(squareRepresentation);
                    } else {
                        
                        setFrom(null)
                        chess.move({
                            from,
                            to: squareRepresentation
                        });
                        setBoard(chess.board());
                        console.log({
                            from,
                            to: squareRepresentation
                        })
                    }
                }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-gray-800' : ' bg-red-500'}`}>
                    <div className="w-full justify-center flex h-full">
                        <div className="h-full justify-center flex flex-col">
                            {square ? <img className="w-12" src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null} 
                        </div>
                    </div>
                </div>
            })}
        </div>
    })}
</div>
}
