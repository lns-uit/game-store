import React, { useState, useEffect, useMemo } from 'react';
import '../../screens/User/styles.css';
import { Form, Input } from 'antd';
import Collection from '../../components/Collection/Collection';
import Helmet from 'react-helmet'
import {
  CollectionType,
  GameType,
  UserType,
} from '../../interfaces/rootInterface';
import gamesApi from '../../api/gamesApi';

interface CollectionLayoutPropsType {
  collection: CollectionType[];
  user: UserType;
  removeGameFromCollection: (idGame: string) => any;
}
function CollectionLayout({
  collection,
  user,
  removeGameFromCollection,
}: CollectionLayoutPropsType) {
  const [search, setSearch] = useState('');
  const gameSearch = useMemo(() => {
    return collection.filter(gameX => {
      return (
        gameX.game.nameGame.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
  }, [collection, search]);

  const { idUser = '' } = user || {};

  const handleRefundGame = async (game: GameType, card: any) => {
    if (idUser) {
      const dataRequest = {
        card,
        newBill: {
          idGame: game.idGame,
          idUser,
          actions: 'refund',
        },
      };
      const response = await gamesApi.createNewBillGame(dataRequest);
      console.log(response);
      const { idBill, message = '', cost, datePaygame } = response || {};
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        '/' +
        (currentdate.getMonth() + 1) +
        '/' +
        currentdate.getFullYear() +
        ' @ ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes() +
        ':' +
        currentdate.getSeconds();
      if (idBill) {
        alert(
          `You refund game ${game.nameGame} with $${cost} at ${
            datePaygame || datetime
          }`
        );
        removeGameFromCollection(game.idGame);
      } else if (message) {
        alert(message);
      }
    }
  };

  const onSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div className='m-top-24'>
       <Helmet>
          <title> {user.userName} </title>
      </Helmet>
      <div className='collection-profile'>
        <div className='flex-basic relative border-radius-8 d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full'>
          <div>
            <div className='d-flex space-between'>
              <div className='fs-24 white'>Collection</div>
              <Form
                name='search'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 100 }}
                initialValues={{ remember: true }}
                onChange={onSearch}
                autoComplete='off'>
                <Form.Item name='search'>
                  <Input
                    placeholder='search'
                    value={search}
                    className='border-radius-8'
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
          <Collection
            handleRefundGame={handleRefundGame}
            collection={gameSearch}
          />
        </div>
      </div>
    </div>
  );
}

export default CollectionLayout;
