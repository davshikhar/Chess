import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    public board: Chess;
    private moves: string[];
    private startTime: Date;
     
    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({type:"game_started", opponent:"Player 2", color:"white"}));
        this.player2.send(JSON.stringify({type:"game_started", opponent:"Player 1", color:"black"}));
    }

    makeMove(player:WebSocket, move: {
        from:string 
        to:string})
        {
        //validate here
        //if the move is valid, update the board and push the move

        //check if the game is still going or not

        //send the updated board to both players
        try{
            this.board.move(move);
            this.moves.push(`${move.from}-${move.to}`);
            this.player1.send(JSON.stringify({type:"update", board:this.board.fen(), moves:this.moves}));
            this.player2.send(JSON.stringify({type:"update", board:this.board.fen(), moves:this.moves}));
        }
        catch(e){
            return;
        }

        if(this.board.isGameOver()){
            const result = this.board.isCheckmate() ? "checkmate" : this.board.isDraw() ? "draw" : "unknown";
            if(result === "checkmate"){
                this.player1.send(JSON.stringify({type:"game_over", result:"checkmate", winner:this.player2}));
                this.player2.send(JSON.stringify({type:"game_over", result:"checkmate", winner:this.player1}));
            } else if(result === "draw") {
                this.player1.send(JSON.stringify({type:"game_over", result:"draw"}));
                this.player2.send(JSON.stringify({type:"game_over", result:"draw"}));
            }
            // Optionally, you can reset the game or remove it from the GameManager
        }
        else{
            // If the game is not over, you can send a message to both players
            this.player1.send(JSON.stringify({type:"move_made", move: move}));
            this.player2.send(JSON.stringify({type:"move_made", move: move}));
        }
    }
}