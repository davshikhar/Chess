import {  Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { useRef, useState } from "react";

interface ChessBoardProps{
    board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
    socket:WebSocket | null;
}

export const ChessBoard = ({board,socket}:ChessBoardProps) => {

    const [from , setFrom] = useState<Square | null>(null);
    const [to , setTo] = useState<Square | null>(null);
    const chess = useRef(new Chess());

    return(
        <div>
            ChessBoard
            {board && board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <div 
                            key={colIndex} 
                            style={{ 
                                width: '50px', 
                                height: '50px', 
                                backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'green' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px'
                            }}
                            onClick={()=>{
                                if(!from){
                                    setFrom(cell?.square || null);
                                }else if(!to){
                                    setTo(cell?.square || null);
                                }else{
                                    setFrom(cell?.square || null);
                                    setTo(null);
                                }
                                console.log("From:", from, "To:", to);
                                //send the move to the server
                                if(from && to){
                                    //sending the move to the server
                                    //check if the move is valid
                                    const move = chess.current.move({from , to});
                                    if(move){
                                        console.log("Sending move:", move);
                                        console.log("valid move");
                                        socket?.send(JSON.stringify({type:"move", payload:move}));
                                    }
                                    else{
                                        console.log("Invalid move");
                                        alert("Invalid move");
                                        console.log("Invalid move from", from , "to", to);
                                    }
                                    
                                    setFrom(null);
                                    setTo(null);

                                }
                            }}>
                            {cell ? `${cell.color === 'w' ? '♙' : '♟'}${cell.type.toUpperCase()}` : ''}
                        </div>
                    ))}
                </div>
            )) }
        </div>
    )
}