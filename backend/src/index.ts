import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const ws = new WebSocketServer({port:8080});
const gameManager = new GameManager();


ws.on('connection',function connection(wss){
    wss.on('error',console.error);
    gameManager.addUser(wss);

    wss.on('message',function message(data){
        console.log("received :%s",data);
        console.log("message received");
        wss.send("message received");
    });

    // wss.send("first message from server");
})