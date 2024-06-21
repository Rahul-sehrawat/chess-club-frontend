import { useEffect, useState } from "react"

const WS_URL = "https://chess-club-backend-webs.onrender.com";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            setSocket(ws);
        }
        

        ws.onclose = () => {
            setSocket(null);
        }

        return () => {
            ws.close();

        }
    }, [])

    return socket;  
}