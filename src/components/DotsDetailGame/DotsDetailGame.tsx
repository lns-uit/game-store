import React, {useRef} from "react";
import Slider from "react-slick";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Images{
    images: {
        name: string,
        link: string
    }[];
    onChange: (newImg: any) => void;
}

function DotsDetailGame({
    images,
    onChange
}, Images){
    const ref = React.useRef<Slider>(null)

    function setImageCurrent(nextOfPrev){
        onChange(nextOfPrev);
    }

    const next = () => {
        setImageCurrent('next');
        ref.current.slickNext();
    };

    const previous = () => {
        setImageCurrent('prev')
        ref.current.slickPrev();
    };
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true, 
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    };
    return(
        <div className="m-top-24 pd-left-right-60 relative button-none">
            <Slider ref={ref} {...settings}>
                {
                    images.map((image,index)=>{
                        return(
                            <div key={index}>
                                <img className="width-169 height-93 pd-2-percent m-10 relative" src={image.link} alt={image.name} />
                            </div>
                        )
                    })
                }
            </Slider>
            <div style={{ textAlign: 'center', height: '100%'}}>
                <div className="button absolute locate-prev pointer hover-slick transition-dot-3" onClick={previous}>
                    <span className="white fs-18">
                        <i className="fa fa-chevron-circle-left"></i>
                    </span>
                </div>
                <div className="button absolute locate-next pointer hover-slick transition-dot-3" onClick={next}>
                    <span className="white fs-18">
                        <i className="fa fa-chevron-circle-right"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DotsDetailGame;