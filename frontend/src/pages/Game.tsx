import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { useSocket } from "../Hooks/useSocket";
import { Chess } from "chess.js";
import { ChessBoard } from "../components/ChessBoard";
import { useNavigate } from "react-router-dom";

export const IN_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
    const socket = useSocket();
    const navigate = useNavigate();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());


    useEffect(()=>{
        if(!socket){
            console.log("No WebSocket connection");
            return;
        }
        socket.onopen = () =>{
            console.log("WebSocket connection established in Game component");
        }
        socket.onmessage = (event) => {
            console.log("Message received in Game component:", event.data);
            const message = JSON.parse(event.data);
            switch(message.type){
                case IN_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("Game initialized:", message.payload);
                    break;
                case MOVE:
                    //TODO: validate the logic written here.
                    // console.log("Move received:", message.payload);
                    // const newBoard = new Chess(chess.fen());
                    // newBoard.move(message.payload);
                    // setChess(newBoard);

                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Board after move:", chess.board());
                    
                    // setBoard(board);
                    break;
                case GAME_OVER:
                    console.log("Game over:", message.payload);
                    break;
            }
        }
    },[socket]);

    // if(!socket){
    //     return(
    //         <div>
    //             <p className="text-white text-3xl">No WebSocket connection yet!!</p>
    //             <div className="text-white text-2xl">Connecting......</div>
    //         </div>
    //     )
    // }

    return(
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 w-full gap-4 flex justify-center">
                        <div className="col-span-4 w-full">
                            <ChessBoard socket={socket} board={board}/>
                        </div>
                        <div className="col-span-4 w-full flex justify-center mt-4">
                            <Button onClick={()=>navigate("/game")}>Play Game</Button>
                            {/* <Button onClick={()=>{
                                socket?.send(JSON.stringify({type: IN_GAME}));
                            }}>Play Game</Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}