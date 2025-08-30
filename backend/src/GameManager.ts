import {WebSocket} from"ws";
import { IN_GAME, MOVE } from "./message";
import { Game } from "./Game";

//this class is going to manage all of the games that we'll be playing.
export class GameManager{

    private games:Game[];
    private users:WebSocket[];
    private pendingUser:WebSocket | null;

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket:WebSocket){
        //to add the user to the idle users array
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket:WebSocket){
        //to remove the users from the idle users array.
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket:WebSocket){
        socket.on("message",(data)=>{
            //USER gRPC here.

            const message = JSON.parse(data.toString());

            if(message.type === IN_GAME){
                if(this.pendingUser){
                //start the game since the user is already waiting.
                const game = new Game(this.pendingUser,socket);
                this.games.push(game);
                this.pendingUser = null;
                console.log("inside the in_game");
                // socket.send("Game started");
                socket.send(message.payload);
                }
                else{
                    this.pendingUser = socket;
                }
            }

            if(message.type === MOVE){
                const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
                if(game){
                    game.makeMove(socket, message.payload);
                }
                else{
                    socket.send("You are not in a game");
                }
            }
        })
    }
}