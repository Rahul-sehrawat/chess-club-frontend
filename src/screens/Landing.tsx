import { useNavigate } from "react-router-dom"
import { Button } from "../components/PlayButton";

export const Landing = () => {
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
                        <h2 className="text-white pt-8 font-bold"> -- Playing Now</h2>
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