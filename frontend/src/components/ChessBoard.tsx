import {  Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { useRef, useState } from "react";
import { MOVE } from "../pages/Game";

interface ChessBoardProps{
    board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
    socket:WebSocket | null;
}

export const ChessBoard = ({board,socket}:ChessBoardProps) => {

    const [from , setFrom] = useState<Square | null>(null);
    const [to , setTo] = useState<Square | null>(null);
    const chess = useRef(new Chess());

    // return(
    //     <div>
    //         ChessBoard:-

    //         {/* {board && board.map((row, rowIndex) => (
    //             <div key={rowIndex} className="flex">
    //                 {row.map((cell, colIndex) => (
    //                     <div 
    //                         key={colIndex} 
    //                         style={{ 
    //                             width: '50px', 
    //                             height: '50px', 
    //                             backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'green' : 'white',
    //                             display: 'flex',
    //                             alignItems: 'center',
    //                             justifyContent: 'center',
    //                             fontSize: '24px'
    //                         }}
    //                         onClick={()=>{
    //                             if(!from){
    //                                 setFrom(cell?.square || null);
    //                                 return; 
    //                             }
    //                             else if(!to){
    //                                 setTo(cell?.square || null);
    //                                 return;
    //                             }
    //                             else{
    //                             setFrom(cell?.square || null);
    //                             setTo(null);
    //                             }
    //                             //debugging the code
    //                             console.log("clicked on cell:", cell?.square);
                            
    //                             alert("From: " + (cell?.square || null) + " To: " + to);
    //                             console.log("From: " + (cell?.square || null) + " To: " + to);
    //                             //send the move to the server
    //                             if(from && to){
    //                                 //sending the move to the server
    //                                 //check if the move is valid
    //                                 const move = chess.current.move({from , to});
    //                                 alert("Move: " + move);
    //                                 if(move){
    //                                     console.log("Sending move:", move);
    //                                     console.log("valid move");
    //                                     socket?.send(JSON.stringify({type:MOVE, payload:move}));
    //                                 }
    //                                 else{
    //                                     console.log("Invalid move");
    //                                     alert("Invalid move");
    //                                     console.log("Invalid move from", from , "to", to);
    //                                 }
                                    
    //                                 setFrom(null);
    //                                 setTo(null);

    //                             }
    //                         }}>
    //                         {cell ? `${cell.color === 'w' ? '♙' : '♟'}` : ''}
    //                     </div>
    //                 ))}
    //             </div>
    //         )) } */}
    //         {board && board.map((row,i)=>{
    //             return(
    //                 <div key={i} className="flex">
    //                     {row.map((square,j)=>{
    //                         return(

    //                         )
    //                     })}
    //             )
    //         })}

    //     </div>
    // )
    return (
        <div className="grid grid-cols-8 gap-0 border-4 border-black w-[400px] h-[400px]">
            {board && board.map((row,i)=>{
                return (
                    <div key={i} className="flex flex-col w-full h-full">
                        {row.map((square,j)=>{
                            const sqaureRep = String.fromCharCode(97 + (j%8))+""+ (8 - Math.floor(j/8)) as Square;
                            return(
                                <div onClick={()=>{
                                    if(!from){
                                        setFrom(sqaureRep);
                                        return; 
                                    }
                                    else if(!to){
                                        setTo(sqaureRep);
                                        return;
                                    }
                                    else{
                                    setFrom(sqaureRep);
                                    setTo(null);
                                    }
                                    //debugging the code
                                    console.log("clicked on cell:", sqaureRep);
                                
                                    // Use cell?.square directly for the alert, or use useEffect to react to state changes
                                    alert("From: " + (sqaureRep || null) + " To: " + to);
                                    console.log("From: " + (sqaureRep || null) + " To: " + to);
                                    //send the move to the server
                                    if(from && to){
                                        //sending the move to the server
                                        //check if the move is valid
                                        const move = chess.current.move({from , to});
                                        alert("Move: " + move);
                                        if(move){
                                            console.log("Sending move:", move);
                                            console.log("valid move");
                                            socket?.send(JSON.stringify({type:MOVE, payload:move}));
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

                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}