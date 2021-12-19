import React, { useEffect, useState } from 'react';
import './styles.css';
import numberWithCommas from '../../utils/numberWithCommas';
import {
  BillType,
  GameDetailss,
  GameType,
} from '../../interfaces/rootInterface';
import Moment from 'react-moment';
import { Modal, Button } from 'antd';
import BuyComponent from '../BuyComponent/BuyComponent';
import RefundComponent from '../RefundComponent/RefundComponent';
import gamesApi from '../../api/gamesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import moment from 'moment';

interface Detail {
  game: GameDetailss;
  bill: BillType | undefined;
}

function PriceGame({ game, bill }: Detail) {
  const { idUser } = useSelector((state: RootState) => state.user) || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalRefund, setIsModalRefund] = useState(false);
  const [timeRefund, setTimeRefund] = useState(-1);
  const isGameFree = game.cost == 0;

  const onClickBuyNow = () => {
    showModal();
  };
  const countDownTimeRefund = () => {
    let timeCountDown = moment(bill?.datePay)
      .add(100, 'hours')
      .diff(moment().format(), 'second');
    if (timeCountDown < 0) return;
    setTimeRefund(timeCountDown);
    setTimeout(countDownTimeRefund, 1000);
  };
  const pad = num => {
    return ('0' + num).slice(-2);
  };
  const secondsFormatHMS = (secs: number) => {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${pad(hours)} h ${pad(minutes)} m ${pad(secs)} s`;
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const showMessage = (message: string) => {
    alert(message);
  };

  const onSubmitPayment = async card => {
    if (idUser) {
      const dataRequest = {
        card,
        newBill: {
          idGame: game.idGame,
          idUser,
        },
      };
      const response = await gamesApi.createNewBillGame(dataRequest);
      const { actions, cost, datePaygame, idBill, message } = response || {};
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
        showMessage(
          `You bought ${actions === 'pay' ? 'bought' : 'refund'} success game ${
            game.nameGame
          } with $${cost} at ${datePaygame || datetime}`
        );
        setIsModalVisible(false);
        window.location.reload();
      } else if (message) {
        showMessage(message);
      }
    }
  };

  const handleRefundGame = async (game: GameDetailss, card: any) => {
    console.log(game, card);

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
      const {
        idBill,
        message = '',
        cost,
        datePaygame,
        title = '',
      } = response || {};
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
      } else if (message) {
        alert(message);
      } else if (title) {
        alert(title);
      }
    }
  };

  const onSubmitRefund = async card => {
    handleRefundGame(game, card);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (bill !== undefined) countDownTimeRefund();
  }, [bill]);

  return (
    <div className='d-flex align-items-start column justify-content-end height-full'>
      <div className='width-full'>
        {game.discount !== null ? (
          <div className='d-flex align-items-end'>
            <div className='bgr-discount pd-4-12 border-radius-4'>
              <span>-{game.discount.percentDiscount}%</span>
            </div>
            <div className='m-left-right-8'>
              <span className='gray-2 fs-12 lh-16'>
                {numberWithCommas(game.cost)}
              </span>
            </div>
            <div className='m-left-8'>
              <span className='fs-12 lh-16'>
                {numberWithCommas(
                  (1 - game.discount.percentDiscount / 100) * game.cost
                )}
              </span>
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-end'>
            <div className='m-left-8'>
              <span className='fs-16 lh-16'>
                {isGameFree ? 'Free' : numberWithCommas(game.cost)}
              </span>
            </div>
          </div>
        )}
        <div className='m-top-36'>
          {bill === undefined ? (
            <div>
              <Button
                type='primary'
                className='bgr-blue1 pd-8-16 width-full border-radius-4 uppercase'
                style={{ height: '45px' }}
                onClick={onClickBuyNow}>
                Buy Now
              </Button>
              <div className='m-top-28 m-bottom-48'>
                <div className='pd-8-16 width-full border-radius-4 pointer transition-dot-3 hover-buy border-1'>
                  <div className='d-flex'>
                    <p
                      className='m-0 center uppercase flex-1-1-auto'
                      style={{ cursor: 'pointer' }}>
                      add to wishlist
                    </p>
                    <span>
                      <i className='fa fa-plus-circle'></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {timeRefund > 0 && bill.cost !== 0 ? (
                <div>
                  <div className='d-flex space-between'>
                    <div style={{ color: '#919191' }}>Time Refund: </div>
                    <b>{secondsFormatHMS(timeRefund)}</b>
                  </div>
                  <br />
                  <Button
                    type='primary'
                    className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                    style={{ height: '45px' }}
                    onClick={() => {
                      setIsModalRefund(true);
                    }}>
                    Refund
                  </Button>
                </div>
              ) : (
                <Button
                  disabled
                  type='primary'
                  className='bgr-red pd-8-16 width-full border-radius-4 uppercase'
                  style={{ height: '45px' }}>
                  In Collection
                </Button>
              )}
            </div>
          )}
          <Modal
            width={1000}
            bodyStyle={{ height: 700 }}
            style={{ borderRadius: 10 }}
            wrapClassName='master-card'
            title={'Buy Game ' + game.nameGame}
            visible={isModalVisible}
            onOk={onSubmitPayment}
            onCancel={handleCancel}
            footer={null}>
            <BuyComponent onSubmitPayment={onSubmitPayment} game={game} />
          </Modal>
          <Modal
            width={500}
            bodyStyle={{ height: 500 }}
            style={{ borderRadius: 10 }}
            wrapClassName='master-card'
            title={'Refund Game ' + game.nameGame}
            visible={isModalRefund}
            onOk={() => {}}
            onCancel={() => {
              setIsModalRefund(false);
            }}
            footer={null}>
            <RefundComponent
              onSubmitRefund={onSubmitRefund}
              game={game}
              bill={bill}
            />
          </Modal>
        </div>

        <div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Developer</p>
            <p className='m-0 fs-12 lh-21'>{game.developer}</p>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Publisher</p>
            <p className='m-0 fs-12 lh-21'>{game.publisher}</p>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Release Date</p>
            <div className='fs-12'>
              <Moment format='DD-MM-yyyy'>{game.releaseDate}</Moment>
            </div>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Plaform</p>
            <p className='m-0 fs-12 lh-21'>{game.plaform}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceGame;
