import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import bookmanagement from '../images/bookreview.jpg'
import libmanagement from '../images/82860library-management-system.jpg'
import bookshelf from '../images/bookshelf.jpg'
const CarouselComponent: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={libmanagement}
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bookshelf}
          alt="Second slide"
        />
        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bookmanagement}
          alt="Third slide"
        />
        <Carousel.Caption>
    
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
