import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

const WS_URL = "https://chess-club-backend-webs.onrender.com";
// const WS_URL = "ws://localhost:8080";


export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const { user } = useAuthContext()

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        if(user){
        ws.onopen = () => {
            setSocket(ws);
        }
        

        ws.onclose = () => {
            setSocket(null);
        }

        return () => {
            ws.close();

        }}
    }, [])

    return socket;  
}