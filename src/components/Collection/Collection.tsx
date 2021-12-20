import React, { useEffect, useState } from 'react';
import gameApi from '../../api/gamesApi';
import { Link } from 'react-router-dom';
import GameItem from '../GameItem/GameItem';
import { Row, Col } from 'antd';
import { ActionType, GameType } from '../../interfaces/rootInterface';
import { CollectionType } from '../../interfaces/rootInterface';

interface GameSearch {
  collection: CollectionType[];
  handleRefundGame: (game: GameType, card: any) => any;
}

function Collection({ collection, handleRefundGame }: GameSearch) {
  const onClickGameItem = (game: GameType) => {};

  return (
    <div className='mr-top-10'>
      <Row>
        {collection.map((collection, index) => {
          const { game } = collection || {};
          return (
            <Col
              key={`game-info-collection-${index}`}
              xxl={4}
              xl={4}
              lg={6}
              md={6}
              sm={12}
              xs={24}>
              <div className='pd-left-right-10 pd-bottom-30 m-bottom-12'>
                <GameItem
                  titleTooltip={'Remove game from collection'}
                  onClickGameItem={onClickGameItem}
                  game={game}
                  action={ActionType.ADD}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Collection;
