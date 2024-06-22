import Lottie from 'lottie-react';
import animationData from '../assets/chessAnimation3.json'; 

const Globe = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default Globe;
