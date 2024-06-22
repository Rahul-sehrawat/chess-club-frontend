
import React from 'react';
import Navbar from '../components/Navbar';
import { Landing } from './Landing';
// import { useAuthContext } from '../hooks/useAuthContext';

const Home: React.FC = () => {
//   const { user } = useAuthContext();
//   let name = user?.email as string

  return( 
    <div className=' bg-stone-800 h-full'>
        <Navbar/>
        <section>
        <Landing/>
        </section>
       <section className='bg-stone-800 pt-20'>
           <div className=' flex justify-around p-10 opacity-40 ' >
              
                <div>
                    dfrd
                </div>
                <img src="/learn.png" className=' rounded-xl ' width={500} />
              
           </div>
       </section>



    </div>
  );
};

export default Home;
