import { useEffect, useState } from "react";
const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
    const [socket , setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        setSocket(ws);

        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
            console.log("Message received:", event.data);
        };

        ws.onclose = () => {
            setSocket(null);
            console.log("WebSocket connection closed");
        };

        return () => {
            //this is the cleanup function that will be called when the component unmounts
            ws.close();
        };
    },[]);
    return socket;
}