import React from 'react';
import { Row, Col } from 'antd';
import AboutGame from '../../components/AboutGame/AboutGame';
import SystemRequirements from '../../components/SystemRequirements/SystemRequirements';
import MoreLikeThis from '../../components/MoreLikeThis/MoreLikeThis';
import RareAndComment from '../../components/RateAndComment/RateAndComment';
import './styles.css';
import { GameDetailss } from '../../interfaces/rootInterface';

interface Detail {
  game: GameDetailss;
}

function LayoutGameDetail2({ game }: Detail) {
  return (
    <div className='m-top-80 white'>
      <Row gutter={[48, 8]}>
        <Col xxl={18} xl={18} lg={24} md={24} sm={24} xs={24}>
          <div className='d-flex'>
            <div className='flex-1-1-auto border-left-1'>
              <div className='d-flex column genres pd-left-20'>
                <p className='m-0 m-left-10 gray-4 fs-24'>Genres</p>
                <div>
                  {game.genres !== null ? (
                    game.genres.map((genre, index) => {
                      return (
                        <span className='m-left-10 underline fs-18' key={index}>
                          {genre.idGenreNavigation.nameGenre}
                        </span>
                      );
                    })
                  ) : (
                    <div>NoThing</div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="flex-1-1-auto border-left-1">
                            <div className="d-flex column features pd-left-20">
                                <p className="m-0 m-left-10 gray-4 fs-24">Features</p>
                                <div>
                                    {detail.features.map((feature,index)=>{
                                        return(
                                            <span className="m-left-10 underline fs-18" key={index}>{feature}</span>
                                        )
                                    })}
                                    Nothing
                                </div>
                            </div>
                       </div> */}
          </div>
          <AboutGame game={game} />
          <SystemRequirements game={game} />
          <MoreLikeThis />
          <RareAndComment />
        </Col>
        <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}></Col>
      </Row>
    </div>
  );
}

export default LayoutGameDetail2;
