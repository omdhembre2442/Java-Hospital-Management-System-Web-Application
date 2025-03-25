import React from 'react';
import { Carousel } from 'react-bootstrap';
import Hospital1 from './image/1.jpg';
import Hospital2 from './image/2.jpg';
import Hospital3 from './image/3.jpg';

function CarouselComp() {
  return (
    <div className="carousel-container">
    <Carousel>
      <Carousel.Item>

        <img className="d-block w-100" src={Hospital1} alt="Expert Care" />
        <Carousel.Caption>
          <h3 style={{ color: '#2DAA9E', fontWeight: 'bold' }}>Expert Medical Care</h3>
          <p style={{ color: 'Black' }}>Dedicated doctors providing world-class healthcare.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={Hospital2} alt="Advanced Technology" />
        <Carousel.Caption>
          <h3 style={{ color: '#2DAA9E', fontWeight: 'bold' }}>State-of-the-Art Facilities</h3>
          <p style={{ color: 'Black' }}>Equipped with the latest medical advancements.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={Hospital3} alt="Patient-Centric Care" />
        <Carousel.Caption>
          <h3 style={{ color: '#2DAA9E', fontWeight: 'bold' }}>Patient-Centric Care</h3>
          <p style={{ color: 'Black' }}>Your health and comfort are our top priority.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CarouselComp;
