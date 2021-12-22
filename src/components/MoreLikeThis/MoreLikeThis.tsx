import React, {useRef,useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import numberWithCommas from '../../utils/numberWithCommas';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';

const games=[
    {
        name: 'Đấu Trường Chân Lý',
        slug: 'dau-truong-chan-ly',
        linkImg: 'https://images.contentstack.io/v3/assets/blt76b5e73bfd1451ea/blt0fdb085fd380322a/60eca98116291c305a36a451/TFT_MID521_Link-Image.jpg',
        discount: 0.3,
        price: 1000000
    },
    {
        name: 'Liên Quân Mobile',
        slug: 'lien-quan-moblie',
        linkImg: 'https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/Hinh-Nen-Lien-Quan-Mobile-Wallpaper-Cho-Iphone-Android-1280x640-1.jpg',
        discount: 0,
        price: 200000
    },
    {
        name: 'Auto Chess',
        slug: 'auto-chess',
        linkImg: 'https://autochessvng.com/upload/product/5500-3000x1688_optimized.jpg',
        discount: 0.2,
        price: 500000
    },
    {
        name: 'PUBG',
        slug: 'pubg',
        linkImg: 'https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg',
        discount: 0,
        price: 280000
    },
    {
        name: 'Free Style 2',
        slug: 'free-style-2',
        linkImg: 'https://cdn.cloudflare.steamstatic.com/steam/apps/339610/capsule_616x353.jpg?t=1634737335',
        discount: 0.3,
        price: 350000
    }
]

interface TypeSlug{
    idGame:string;
}

function MoreLikeThis() {
    let slug  = useParams<TypeSlug>();
    const ref = React.useRef<Slider>(null);
    const [gameMoreLikeThis,setGameMoreLikeThis] = useState<any>([])
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const callMoreLikeThis = async ()=>{
        await axios.get(`${Endpoint.mainApi}api/game/more-like-this/${slug.idGame}/5`)
            .then(res=>{
                console.log(res.data)
                setGameMoreLikeThis(res.data);
            })
            .catch(err=>{console.log(err)})
    }

    const next = () => {
        ref.current.slickNext();
    };

    const previous = () => {
        ref.current.slickPrev();
    };

    useEffect(() => {
        callMoreLikeThis()
    },[])
    return(
        <div className="m-top-40 m-bottom-16">
            <div className="block_header">
                <div className="float-right">
                    <Link to="#" className="see-all">See all</Link>
                </div>
                <h2 className="white uppercase lh-26 pd-top-2 m-bottom-10 fs-14 weight-normal brg-img flex-1-1-auto">
                    More like this
                </h2>
            </div>
            <div className="store_horizontal_autoslider_ctn relative">
                <Slider ref={ref} {...settings}>
                    {
                        gameMoreLikeThis.length === 0 
                        ? 
                            (<div>loadding....</div>)
                        :
                        (gameMoreLikeThis.map((game,index)=>{
                            return(
                                <Link to={'/game/'+game.idGame} className="block-content-hover">
                                    <div className="block-content">
                                        <img src={game.imageGameDetail[0].url} alt={game.nameGame} />
                                        <h4 className="m-0 white fs-13">{game.nameGame}</h4>
                                        <div className="discount_block">
                                            {
                                                game.discount !== null 
                                                ?
                                                <div className="d-flex justify-content-end">
                                                    <div className="pd-0-3 green-1 bgr-green">
                                                        -{game.discount.percentDiscount}%
                                                    </div>
                                                    <div className="pd-0-3 d-flex">
                                                        <p className="m-0 delete-price">
                                                            {numberWithCommas(game.cost)}₫
                                                        </p>
                                                        <p className="m-0 final-price">
                                                            {numberWithCommas(game.cost - (game.discount.percentDiscount/100)* game.cost)}$
                                                        </p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="d-flex justify-content-end">
                                                    <p className="m-0 final-price">
                                                        {numberWithCommas(game.cost - 0* game.cost)}$
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        }))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default MoreLikeThis;