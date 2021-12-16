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
  const onClickGameItem = (game: GameType) => {
    if (game.cost == 0) {
      const isAnswer = confirm('Are u want to delete it ?');
      if (isAnswer) {
        handleRefundGame(game, {
          masterCardCCV: 533,
          masterCardExpire: '11/21',
          masterCardName: 'NGUYEN PHUC',
          masterCardNumber: '1040000001',
        });
      }
    } else {
      // show card info
      const isAnswer = confirm('Are u want to refund it ?');
      if (isAnswer) {
        handleRefundGame(game, {
          masterCardCCV: 533,
          masterCardExpire: '11/21',
          masterCardName: 'NGUYEN PHUC',
          masterCardNumber: '1040000001',
        });
      }
    }
  };

  return (
    <div className='mr-top-10'>
      <Row>
        {collection.map((collection, index) => {
          const { game } = collection || {};
          return (
            <Col
              key={`game-info-collection-${index}`}
              xxl={6}
              xl={8}
              lg={24}
              md={12}
              sm={12}
              xs={24}>
              <Link to={'/game/' + game.idGame + '/' + game.lastestVersion}>
                <div className='pd-left-right-10 pd-bottom-30 m-bottom-12'>
                  <GameItem
                    titleTooltip={'Remove game from collection'}
                    onClickGameItem={onClickGameItem}
                    game={game}
                    action={ActionType.REMOVE}
                  />
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
