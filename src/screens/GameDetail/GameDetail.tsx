import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutGameDetail1 from '../../layout/LayoutGameDetail1/LayoutGameDetail1';
import LayoutGameDetail2 from '../../layout/LayoutGameDetail2/LayoutGameDetail2';
import gamesApi from '../../api/gamesApi';
import { GameDetailss } from '../../interfaces/rootInterface';

function GameDetail() {
  const slug = useParams();
  const [game, setGame] = useState<GameDetailss>();

  const fetchGameData = async () => {
    console.log(slug);
    const response = await gamesApi.getGameDetail(slug);
    if (response) {
      console.log(response);
      setGame(response);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <div>
      {!game?.idGame ? (
        <div>Loadding</div>
      ) : (
        <div style = {{marginTop: '30px'}}>
          <LayoutGameDetail1 game={game} />
          <LayoutGameDetail2 game={game} />
        </div>
      )}
    </div>
  );
}

export default GameDetail;
