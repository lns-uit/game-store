import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LayoutGameDetail1 from '../../layout/LayoutGameDetail1/LayoutGameDetail1';
import LayoutGameDetail2 from '../../layout/LayoutGameDetail2/LayoutGameDetail2';
import gamesApi from '../../api/gamesApi';
import { BillType, GameDetailss } from '../../interfaces/rootInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';

function GameDetail() {
  const slug = useParams();
  const [game, setGame] = useState<GameDetailss>();
  const [bill, setBill] = useState<BillType>();
  const user = useSelector((state: RootState) => state.user);
  const { idUser } = user || {};

  const fetchGameData = async () => {
    console.log(slug);
    const response = await gamesApi.getGameDetail(slug);
    if (response) {
      console.log(response);
      await checkIsBought(response.idGame);
      setGame(response);
    }
  };
  const checkIsBought = (idGame:string) => {
    axios.get(Endpoint.mainApi + 'api/collection/is-own-by-user/' + idUser + '/' + idGame)
      .then(res =>{
        console.log(res.data);
        setBill(res.data);
      })
      .catch(err => {

      })
  }
  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <div>
      {!game?.idGame ? (
        <div>Loadding</div>
      ) : (
        <div style = {{marginTop: '30px'}}>
          <LayoutGameDetail1 game={game} bill = {bill}/>
          <LayoutGameDetail2 game={game} />
        </div>
      )}
    </div>
  );
}

export default GameDetail;
