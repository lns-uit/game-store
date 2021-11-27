import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {dotNumber} from '../../utils/index';

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

function MoreLikeThis() {
    const ref = React.useRef<Slider>(null)
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const next = () => {
        ref.current.slickNext();
    };

    const previous = () => {
        ref.current.slickPrev();
    };
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
                        games.map((game,index)=>{
                            return(
                                <Link to={'/game/'+game.slug} className="block-content-hover">
                                    <div className="block-content">
                                        <img src={game.linkImg} alt={game.name} />
                                        <h4 className="m-0 white fs-13">{game.name}</h4>
                                        <div className="discount_block">
                                            {
                                                game.discount !== 0 
                                                ?
                                                <div className="d-flex justify-content-end">
                                                    <div className="pd-0-3 green-1 bgr-green">
                                                        -{game.discount*100}%
                                                    </div>
                                                    <div className="pd-0-3 d-flex">
                                                        <p className="m-0 delete-price">
                                                            {dotNumber(game.price)}₫
                                                        </p>
                                                        <p className="m-0 final-price">
                                                            {dotNumber(game.price - game.discount* game.price)}₫
                                                        </p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="d-flex justify-content-end">
                                                    <p className="m-0 final-price">
                                                        {dotNumber(game.price - game.discount* game.price)}₫
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default MoreLikeThis;