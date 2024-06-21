import React, { useState, useEffect, useRef } from 'react';

type ClockProps = {
    initialTime: number;
    player: string;
};

const ChessClock: React.FC<ClockProps> = ({ initialTime, player }) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const timerRef = useRef<number | undefined>(); // Timer ID reference

    useEffect(() => {
        ws.current = new WebSocket('https://chess-club-backend-webs.onrender.com');

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.player !== player) {
                setIsRunning(false);
                if (data.time !== null) {
                    setTime(data.time);
                    
                }
            }
            console.log(data.time)
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [player]);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = window.setInterval(() => {
                setTime(prevTime => {
                    const newTime = prevTime - 1;
                    if (ws.current) {
                        ws.current.send(JSON.stringify({ player, time: newTime }));
                    }
                    return newTime;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(prev => !prev);
        if (ws.current) {
            ws.current.send(JSON.stringify({ player, time }));
        }
    };

    return (
        <div>
            <h2>Player {player}</h2>
            <p>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</p>
            <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
    );
};

export default ChessClock;
