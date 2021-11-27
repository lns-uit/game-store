import React, {useRef} from "react";
import PriceGame from "../../components/PriceGame/PriceGame";
import {Row, Col} from "antd";
import DotsDetailGame from "../../components/DotsDetailGame/DotsDetailGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import MyCarousel from "../../components/MyCarousel/MyCarousel";
import {GameDetailss} from "../../interfaces/rootInterface"

interface Detail{
    game: GameDetailss
}

function LayoutGameDetail1({
    game
}:Detail){
    const ref = React.useRef<Slider>(null)

    const settings = {
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    };
    

    function setImageCurrents(nextOfPrev){
        if (nextOfPrev === 'next'){
            ref.current.slickNext();
        }
        else{
            ref.current.slickPrev();
        }
    } 

    return(
        <div className="cover">
            <Row gutter={[48, 8]}>
                <Col 
                    xxl={18}
                    xl={18}
                    lg={24}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <div className="flex-1-1-auto max-width-1029">
                        <div className="m-bottom-24">
                            <div className="text-cover d-inline-block">
                                <h3 className="white m-0 fs-48 lh-56 uppercase">{game.nameGame}</h3>
                            </div>
                        </div>
                        <div className="d-inline-block width-full cover-img button-none">
                            <div className="max-width-910 max-height-580">
                            <Slider ref={ref} {...settings}>
                                {
                                    game.imageGameDetail.map((image,index)=>{
                                        return(
                                            <div className="max-height-580 min-height-580" key={index}>
                                                <img style={{objectFit:'cover',height:'100%'}} src={image.url} alt={image.idImage} />
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                            {/* <MyCarousel games={gamesInfoMockData} /> */}
                            </div>
                        </div>
                        <DotsDetailGame images={game.imageGameDetail} onChange={setImageCurrents}></DotsDetailGame>
                        
                    </div>
                </Col>
                <Col
                    xxl={6}
                    xl={6}
                    lg={24}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <div className="height-full white pd-bottom-20">
                        <PriceGame game={game}/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LayoutGameDetail1;