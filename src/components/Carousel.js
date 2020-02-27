import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.css';

const ImageCarousel = props => {
    const photos = props.history.location.state.resources.photos;

    return (
        <>
            <button className="backBtn" onClick={props.history.goBack}>Click to go back</button>
            <Carousel>
                {
                    photos.map(photo => {
                        return (
                            <div>
                                <img className='image' src={photo.url} alt="rental-carousel" />
                            </div>
                        )
                    })
                }
            </Carousel>
            <div className="address-container">
                <p className="address">Address:</p>
                <p className="address-info">{' '}{props.history && props.history.location.state.address}</p>
            </div>
        </>
    )
}


export default ImageCarousel;

