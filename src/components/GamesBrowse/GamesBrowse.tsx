import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameItem from '../../components/GameItem/GameItem';
import { ActionType, GameType } from '../../interfaces/rootInterface';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './styles.css';

interface Pages {
  games: GameType[];
  lastGameRef: any;
}

function GamesBrowse({ games, lastGameRef }: Pages) {
  return (
    <div className='mr-top-10'>
      <Row>
        {games.map((game, index) => {
          const isLastGameItem = index + 1 == games.length;
          return (
            <Col
              // change to id game
              key={`game-info-${Math.floor(Math.random() * 10000000)}`}
              xxl={6}
              xl={8}
              lg={24}
              md={12}
              sm={12}
              xs={24}>
              <Link to={'/game/' + game.idGame + '/' + game.lastestVersion}>
                {isLastGameItem ? (
                  <div
                    ref={lastGameRef}
                    className='pd-left-right-10 pd-bottom-30 m-bottom-12'>
                    <GameItem game={game} action={ActionType.ADD} />
                  </div>
                ) : (
                  <div className='pd-left-right-10 pd-bottom-30 m-bottom-12'>
                    <GameItem game={game} action={ActionType.ADD} />
                  </div>
                )}
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default GamesBrowse;
