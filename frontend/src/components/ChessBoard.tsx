import {  Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { useRef, useState } from "react";
import { MOVE } from "../pages/Game";

interface ChessBoardProps{
    board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
    socket:WebSocket | null;
    chess: Chess;
    setBoard:any;
}

export const ChessBoard = ({board,socket,chess,setBoard}:ChessBoardProps) => {

    const [from , setFrom] = useState<Square | null>(null);
    const [to , setTo] = useState<Square | null>(null);
    // const chess = useRef(new Chess());

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
        <div className="text-white-200">
            {board && board.map((row,i)=>{
                return (
                    // <div key={i} className="w-full">
                    //     {row.map((square,j)=>{
                    //         const sqaureRep = String.fromCharCode(97 + (j%8))+""+ (8 - Math.floor(j/8)) as Square;
                    //         return(
                    //             <div
                    //             className={`w-[50px] h-[50px] flex items-center justify-center text-[24px] ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'}`} 
                    //             onClick={()=>{
                    //                 if(!from){
                    //                     setFrom(sqaureRep);
                    //                     return; 
                    //                 }
                    //                 else if(!to){
                    //                     setTo(sqaureRep);
                    //                     return;
                    //                 }
                    //                 else{
                    //                 setFrom(sqaureRep);
                    //                 setTo(null);
                    //                 }
                    //                 //debugging the code
                    //                 console.log("clicked on cell:", sqaureRep);
                                
                    //                 // Use cell?.square directly for the alert, or use useEffect to react to state changes
                    //                 alert("From: " + (sqaureRep || null) + " To: " + to);
                    //                 console.log("From: " + (sqaureRep || null) + " To: " + to);
                    //                 //send the move to the server
                    //                 if(from && to){
                    //                     //sending the move to the server
                    //                     //check if the move is valid
                    //                     const move = chess.current.move({from , to});
                    //                     alert("Move: " + move);
                    //                     if(move){
                    //                         console.log("Sending move:", move);
                    //                         console.log("valid move");
                    //                         socket?.send(JSON.stringify({type:MOVE, payload:move}));
                    //                     }
                    //                     else{
                    //                         console.log("Invalid move");
                    //                         alert("Invalid move");
                    //                         console.log("Invalid move from", from , "to", to);
                    //                     }
                                        
                    //                     setFrom(null);
                    //                     setTo(null);

                    //                 }
                    //             }}>
                    //                 {square ? `${square.color === 'w' ? '♙' : '♟'}` : ''}
                    //             </div>
                    //         )
                    //     })}
                    // </div>
                    <div key={i} className="flex w-full">
                        {row.map((square,j)=>{
                            const squareRep = String.fromCharCode(97 + (j%8))+""+ (8-i) as Square;
                            return(
                                <div onClick={()=>{
                                    if(!from){
                                        setFrom(squareRep);
                                        return; 
                                    }
                                    else{
                                        socket?.send(JSON.stringify({type:MOVE, payload:{from , to:squareRep}}));
                                        setFrom(null);
                                        chess.move({from , to:squareRep});
                                        setBoard(chess.board());
                                        console.log({from , to:squareRep});
                                        setTo(null);
                                    }
                                    //debugging the code
                                    console.log("clicked on cell:", squareRep);
                                
                                    // Use cell?.square directly for the alert, or use useEffect to react to state changes
                                    console.log("From: " + (squareRep || null) + " To: " + to);
                                    //send the move to the server
                                    if(from && to){
                                        //sending the move to the server
                                        //check if the move is valid
                                        setFrom(null);
                                        setTo(null);

                                    }
                                }} key={j} className={`w-16 h-16 text-[24px] ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-white'}`}>
                                    {/* {square ? `${square.color === 'w' ? '♙' : '♟'}` : ''} */}
                                    <div className="w-full h-full justify-center flex">
                                        <div>
                                            {square ? square.type : ' '}    
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}