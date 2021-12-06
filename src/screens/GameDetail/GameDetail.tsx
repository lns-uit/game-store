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
        <div>
          <LayoutGameDetail1 game={game} />
          <LayoutGameDetail2 game={game} />
        </div>
      )}
    </div>
  );
}

const GAME = {
  idGame: '15b3964d-4283-41ae-b284-4e7bc0d2178z',
  nameGame: 'league of legends',
  averageRate: 4.0,
  numOfRate: 100,
  developer: 'UIT',
  publisher: 'UIT',
  releaseDate: '2021-11-27T00:00:00',
  plaform: 'Window',
  cost: 400,
  lastestVersion: '1.1',
  numberOfBuyer: 0,
  numberOfDowloaders: 0,
  discount: {
    idDiscount: 'f507da3a-ccee-4fd8-ac36-f54b453ca328',
    percentDiscount: 50.0,
    title: 'Sieu sale thang 2',
    startDate: '',
    endDate: '',
  },
  genres: [
    {
      idGenreNavigation: {
        idGenre: 'f7be8fc4-30e1-45e7-a658-733e79097115',
        nameGenre: 'Moba',
      },
    },
  ],
  imageGameDetail: [
    {
      idImage: '101b9d9c-8313-4106-8c2c-c75f4e39cdimage1',
      url: 'https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg',
    },
    {
      idImage: '101b9d9c-8313-4106-8c2c-c75f4e39cdimage2',
      url: 'https://cdn.mos.cms.futurecdn.net/2NQGX7WGDekmLQwhtzLRQP.jpg',
    },
    {
      idImage: '101b9d9c-8313-4106-8c2c-c75f4e39cdimage3',
      url: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2016/07/05/1331804457408_2/er-jinx-og-vi-virkelig-s%C3%B8stre.jpg',
    },
    {
      idImage: '101b9d9c-8313-4106-8c2c-c75f4e39cdimage4',
      url: 'https://cdn.mos.cms.futurecdn.net/G2VQ2CL9j4w6Jv5z3QwjuN.jpg',
    },
    {
      idImage: '101b9d9c-8313-4106-8c2c-c75f4e39cdimage5',
      url: 'https://victory8.online/wp-content/uploads/2020/10/top-7-cach-farm-linh-hieu-qua-game-lien-minh-huyen-thoai-mua-10-p2-1.jpg',
    },
  ],
  newVersion: {
    idGameVersion: '101b9d9c-8313-4106-8c2c-c75f4e39cdfc',
    idGame: '15b3964d-4283-41ae-b284-4e7bc0d2178z',
    versionGame: '1.1',
    dateUpdate: '2021-11-27T00:00:00',
    urlDownload: '',
    shortDescription: 'Demo Demo',
    descriptions:
      '<p>sdfsdfsdfsdfsdf</p>\n<p><strong>fdsfsdfsdfsdfdsfsdf</strong></p>\n<p><span style="font-size: 11px;"><ins>fdsfsdfsdfsdfsdfsdfsdfsdfdsf</ins></span></p>\n<h1><span style="font-size: 11px;"><ins>dfsdfsdfsdfsdfsdfdsfsdfdsfdsfsdfsdf</ins></span><span style="font-size: 24px;"> dfsdfsdfsdfdsf</span></h1>',
    requires: 'Requires a 64-bit processor and operating system',
    os: 'Windows 10',
    processor: 'Intel Q9450 @ 2.6GHz or AMD Phenom II X6 @ 3.3 GHz',
    storage: '50 GB available space',
    directX: 'Version 11',
    graphics: 'Nvidia GeForce GTX 650 or AMD Radeon 7750',
    privacyPolicy: 'Demo',
    memory: '4GB',
  },
};

export default GameDetail;
