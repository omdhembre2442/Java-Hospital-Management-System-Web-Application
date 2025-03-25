import React from 'react';
import CarouselComp from './CarouselComp';
import HomeDoctorList from './HomeDoctorList';
import About from './About';
import Contact from './Contact';

function Home() {
    return ( 
        <div>
            <CarouselComp />
            <HomeDoctorList />
            <About />
            <Contact />
        </div>
     );
}

export default Home;