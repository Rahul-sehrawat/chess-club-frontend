import { useNavigate } from "react-router-dom"
import { Button } from "../components/PlayButton";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

export const Landing = () => {
    const socket = useSocket();
    const [playersActive, setPlayersActive] = useState<number | null>(null); // State for storing number of active players
   
    useEffect(() => {
        if (!socket) {
            console.log("Socket not connected");
            return;
        }
        socket.send(JSON.stringify({ type: 'READY', message: "WebSocket is ready to receive messages" }));
        socket.onmessage = (event) => {
            if (!event || !event.data) {
                return;
            }
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'PLAYERS_ACTIVE') {
                    console.log('Number of players active Now', message.message);
                    setPlayersActive(message.message);

                } else {
                    console.log('message from server:', message);
                }
            } catch (err) {
                console.error("Error parsing message from WebSocket:", err);
            }
        };
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);
    const navigate = useNavigate();
    return <div className=" w-full h-full flex justify-center items-start pt-12 " >
            <div className=" border-black  bg-black bg-opacity-80 border-4 h-3/4  w-3/4  rounded-xl flex  justify-evenly p-10 shadow-[5px_5px_0px_0px_rgba(255,255,255)]   " >
                <div >
                    <div className="  max-w-1/2  ">
                        <video  src="video.mp4" width={400} autoPlay muted loop ></video>
                    </div>
                </div>
                <div className=" text-center  "  >
                        <h1 className=" text-4xl font-bold text-white">Play Chess Online  </h1>
                        <div className="flex justify-center gap-10 ">
                        <h2 className="text-white pt-8 font-bold">-- Games Today</h2>
                        <h2 className="text-white pt-8 font-bold">{playersActive !== null ? playersActive : '--'} Playing Now</h2>
                        </div>
                       <div className=" flex flex-col gap-10  m-12    ">
                        <Button  onClick={() => {
                                navigate("/game")
                            }} >
                                <div className="flex gap-4  ">
                                <div>
                                    <img src="picon.png" width={60} alt="" />
                                </div>
                                <div >
                                <h1 className=" flex justify-start"> Play Online </h1>
                               <p className="  pt-2 hidden  md:block lg:block text-sm">Play with someone at your level</p>
                               </div>
                               </div>
                        </Button>
                        <Button  onClick={() => {
                                navigate("/computer")
                            }} >
                               <div className="flex gap-4">
                                <div>
                                    <img src="bot.png" width={60} alt="" />
                                </div>
                                <div >
                                <h1 className=" flex justify-start"> Play Computer </h1>
                               <p className="  pt-2 hidden  md:block lg:block text-sm">Play vs customizable training bots</p>
                               </div>
                               </div>
                        </Button>  
                       </div>  
                </div>
            </div>
    </div>
}