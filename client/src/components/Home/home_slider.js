import React from 'react';
import Slider from 'react-slick'
import MyButton from '../ultils/button'
import './homeSlider.scss'
const HomeSlider = (props) => {
    
    const slides = [
        {
            img: 'images/lasted/bg_4.jpg',
            lineOne: 'Little shrup',
            lineTwo: 'Free ship',
            linkTitle: 'See more',
            linkTo: '/shop'
        },
        {
            img: 'images/lasted/bg_3.jpg',
            lineOne: 'WELCOM TO PLANT',
            lineTwo: 'we\'ll bring you the best services',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: 'images/lasted/bg_5.jpg',
            lineOne: 'Areca tree',
            lineTwo: 'Tropical',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        
    ]

    const setting = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }

    const generateSlides = () => (
        slides ? slides.map((item,i)=>(
           <div key={i}>
                 <div className="slider_image"
                     style={{
                         background: `url(${item.img})`,
                         height: `${window.innerHeight/1.5}px`,
                         backgroundSize: 'cover', 
                         backgroundRepeat: 'no-repeat',
                         backgroundPosition: 'center'}}>
                            z
                            <div className="slider_action">
                            <div className='slide_title'>{item.lineOne}</div>
                            <div className='slide_low_title'>{item.lineTwo}</div>
                        <div>
                        <MyButton
                            type="default"
                            title={item.linkTitle}
                            linkTo={item.linkTo}>
                        </MyButton>
                        </div>
                     </div>
                 </div>
           </div>
         ))
         :null                
    )

    return (
        <div>
            <Slider {...setting}>
                {generateSlides()}
            </Slider>
        </div>
    );
};

export default HomeSlider;