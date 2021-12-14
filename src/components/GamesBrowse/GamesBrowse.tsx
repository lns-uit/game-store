import React, { useState, useEffect } from 'react';
import GameItem from '../../components/GameItem/GameItem';
import { ActionType, GameType } from '../../interfaces/rootInterface';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './styles.css';
import axios from 'axios';
import gameApi from '../../api/gamesApi';
import {Helmet} from "react-helmet";
interface Pages {
  games: GameType[];
}

function GamesBrowse({ games }: Pages) {
  return (
    <div className='mr-top-10'>
      <Helmet> <title> Stun Store | Browse </title>  </Helmet>
      <Row>
        {games.map((game, index) => {
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

export default GamesBrowse;
