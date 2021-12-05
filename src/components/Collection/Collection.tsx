import React, { useEffect, useState } from 'react';
import gameApi from '../../api/gamesApi';
import { Link } from 'react-router-dom';
import GameItem from '../GameItem/GameItem';
import { Row, Col } from 'antd';
import { ActionType } from '../../interfaces/rootInterface';
import { CollectionType } from '../../interfaces/rootInterface';

interface GameSearch {
  collection: CollectionType[];
}

function Collection({ collection }: GameSearch) {
  console.log(collection);
  return (
    <div className='mr-top-10'>
      <Row>
        {collection.map((collection, index) => {
          const { game } = collection || {};
          return (
            <Col
              key={`game-info-${index}`}
              xxl={6}
              xl={8}
              lg={24}
              md={12}
              sm={12}
              xs={24}>
              <Link to={'/game/' + game.idGame + '/' + game.lastestVersion}>
                <div className='pd-left-right-10 pd-bottom-30 m-bottom-12'>
                  <GameItem game={game} action={ActionType.REMOVE} />
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Collection;
