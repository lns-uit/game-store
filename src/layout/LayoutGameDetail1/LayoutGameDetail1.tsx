import React, {useRef} from "react";
import PriceGame from "../../components/PriceGame/PriceGame";
import {Row, Col} from "antd";
import DotsDetailGame from "../../components/DotsDetailGame/DotsDetailGame";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import MyCarousel from "../../components/MyCarousel/MyCarousel";
import { gamesInfoMockData } from "../../api/mockData";

const img=[
    {
        name: "ảnh 1",
        link: "https://cdn.tgdd.vn/GameApp/4/221941/Screentshots/lien-minh-huyen-thoai-game-moba-pho-bien-nhat-the-gioi-21-05-2020-2.jpg",
    },
    {
        name: "ảnh 2",
        link: "https://taimienphi.vn/tmp/cf/Images/nth/2021/4/2/lien-minh-huyen-thoai-33.jpg",
    },
    {
        name: "ảnh 3",
        link: "https://cdn.vn.garenanow.com/web/lol-product/home/images/articles/minhminh55/2014/6-khuyen-mai/shop-guide/shops-2.jpg",
    },
    {
        name: "ảnh 4",
        link: "https://mongchienthan.vn/wp-content/uploads/2020/06/share-acc-lien-minh-rank-kim-cuong.jpg",
    },
    {
        name: "ảnh 5",
        link: "https://i.ytimg.com/vi/DoLCEGod41g/maxresdefault.jpg",
    },
]

interface Detail{
    detail:{
        name: string;
        genres: string[];
        features: string[];
        description: string;
        minimumWindow:{
            name: string; value: string;
        }[];
        recommendedWindow:{
            name: string; value: string;
        }[];
        minimumMacOs:{
            name: string; value: string;
        }[];
        recommendedMacOs:{
            name: string; value: string;
        }[];
        discount: number;
        price: number;
        details:{
            name: string; value: string;
        }[];
        requiresMinimum: string;
        requiresRecommended: string;
    }
}

function LayoutGameDetail1({
    detail
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
                                <h3 className="white m-0 fs-48 lh-56 uppercase">{detail.name}</h3>
                            </div>
                        </div>
                        <div className="d-inline-block width-full cover-img button-none">
                            <div className="max-width-910 max-height-580">
                            {/* <Slider ref={ref} {...settings}>
                                {
                                    img.map((image,index)=>{
                                        return(
                                            <div className="max-height-580 min-height-580" key={index}>
                                                <img style={{objectFit:'cover',height:'100%'}} src={image.link} alt={image.name} />
                                            </div>
                                        )
                                    })
                                }
                            </Slider> */}
                            <MyCarousel games={gamesInfoMockData} />
                            </div>
                        </div>
                        {/* <DotsDetailGame images={img} onChange={setImageCurrents}></DotsDetailGame> */}
                        
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
                        <PriceGame detail={detail}></PriceGame>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LayoutGameDetail1;