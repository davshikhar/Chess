import { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:8080});


ws.on('connection',function connection(wss){
    wss.on('error',console.error);

    wss.on('message',function message(data){
        console.log("received :%s",data);
        console.log("message received");
        wss.send("message received");
    });

    wss.send("Something");
})