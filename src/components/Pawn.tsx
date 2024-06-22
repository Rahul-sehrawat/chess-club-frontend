import Lottie from 'lottie-react';
import animationData from '../assets/chessAnimation2.json'; 

const Pawn = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Pawn;
