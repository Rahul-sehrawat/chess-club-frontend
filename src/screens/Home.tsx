import React from 'react';
import Navbar from '../components/Navbar';
import { Landing } from './Landing';
import Globe from '../components/Globe';
import Pawn from '../components/Pawn';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return( 
    <div className="h-full overflow-y-scroll" style={{ scrollSnapType: 'y mandatory' }}>  
        <div>
          <section className="h-screen" style={{ background: "linear-gradient(180deg, #584939, #000000)", height: '100vh', scrollSnapAlign: 'start' }}>
              <Navbar/>
              <Landing/>
          </section>
          <section className="h-screen" style={{ background: "linear-gradient(90deg, #584939, #000000)", height: '100vh', scrollSnapAlign: 'start' }}>  
              <div className="relative top-10  ">
                <div className="absolute inset-0 flex justify-center items-center ">
                    <Globe/>
                </div>
                <div className="absolute inset-0 flex justify-center items-center ">
                    <Pawn/>
                </div>

                {/* card component for future development */}
                {/* <div>
                <div className='text-white absolute top-40  w-96  left-10'>
                <Card heading="chess opening" imgsrc ="./learn.png"/>
                </div>
                </div> */}
            
              </div>
            
          </section>
          
        </div>
        <Footer/>
    </div>
  );
};

export default Home;
