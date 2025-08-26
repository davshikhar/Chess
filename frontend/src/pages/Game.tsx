import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { useSocket } from "../Hooks/useSocket";
import { Chess } from "chess.js";

export const IN_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
    const socket = useSocket();
    const [board, setBoard] = useState(new Chess());

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
                    setBoard(new Chess());
                    console.log("Game initialized:", message.payload);
                    break;
                case MOVE:
                    //TODO: validate the logic written here.
                    console.log("Move received:", message.payload);
                    const newBoard = new Chess(board.fen());
                    newBoard.move(message.payload);
                    setBoard(newBoard);

                    //const move = board.move(message.payload);
                    // if(move) setBoard(board);
                    break;
                case GAME_OVER:
                    console.log("Game over:", message.payload);
                    break;
            }
        }
    },[socket]);

    return(
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 bg-red-200 w-full">
                        <div className="col-span-4 bg-red-200 w-full">
                            <ChessBoard/>
                        </div>
                        <div className="col-span-2 bg-green-200 w-full">
                            <Button onClick={()=>Navigate("/game")}>Play Game</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}