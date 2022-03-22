import React, { useEffect, useState } from 'react';
import './styles.css';
import numberWithCommas from '../../utils/numberWithCommas';
import {
  BillType,
  GameDetailss,
  GameType,
} from '../../interfaces/rootInterface';
import Moment from 'react-moment';
import { Modal, Button, message } from 'antd';
import BuyComponent from '../BuyComponent/BuyComponent';
import RefundComponent from '../RefundComponent/RefundComponent';
import gamesApi from '../../api/gamesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import moment from 'moment';
import wishlistApi from '../../api/wishlistApi';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import { createAdd } from 'typescript';

interface Detail {
  game: GameDetailss;
  bill: BillType | undefined;
}

function PriceGame({ game, bill }: Detail) {
  const { idUser } = useSelector((state: RootState) => state.user) || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalRefund, setIsModalRefund] = useState(false);
  const [timeDiscount, setTimeDiscount] = useState(-1);
  const [timeRefund, setTimeRefund] = useState(-1);
  const [isSubmit, setIsSubmit] = useState(false);
  const isGameFree = game.cost == 0;
  const [isWishList,setIsWishList] = useState(false);
  const onClickBuyNow = () => {
      if (idUser === null || idUser === undefined) message.warn("Login To Buy This Game");
        else showModal();
  };
  const countDownTimeRefund = () => {

    let billTimeRefund = (bill?.timeRefund || 0)  + 25200;
    let timeCountDown = moment(bill?.datePay)
                        .add(billTimeRefund, 'seconds')
                        .diff(moment().utc().format(), 'second');
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
    return `${(hours)} h ${pad(minutes)} m ${pad(secs)} s`;
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const showMessage = (message: string) => {
    alert(message);
  };

  const onSubmitPayment = async card => {
    setIsSubmit(true);
    if (idUser) {
      const dataRequest = {
        card: card,
        newBill: {
          idGame: game.idGame,
          idUser: idUser,
        }
      };
      const response = await gamesApi.createNewBillGame(dataRequest);
      const { actions, cost, datePaygame, idBill, message } = response || {};
      var datetime = moment().format();
      if (idBill) {
        showMessage(
          `You bought ${actions === 'pay' ? 'bought' : 'refund'} success game ${
            game.nameGame
          } with $${cost} at ${datePaygame || datetime}`
        );
        setIsModalVisible(false);
        setIsSubmit(false);
        window.location.reload();
      } else if (message) {
        showMessage(message);
        setIsSubmit(false);
      }
    }
  };

  const handleRefundGame = async (game: GameDetailss, card: any) => {
    setIsSubmit(true);
    if (idUser) {
      const dataRequest = {
        card: card,
        newBill: {
          idGame: game.idGame,
          idUser: idUser,
          actions: 'refund',
        },
      };
      const response = await gamesApi.createNewBillGame(dataRequest);
      const {
        idBill,
        message = '',
        cost,
        datePaygame,
        title = '',
      } = response || {};
      var datetime = moment().format();
      if (idBill) {
        alert(
          `You refund game ${game.nameGame} with $${cost} at ${
            datePaygame || datetime
          }`
        ); 
        setIsModalRefund(false);
        setIsSubmit(false);
        window.location.reload();
      } else if (message) {
        setIsSubmit(false);
        alert(message);
      } else if (title) {
        setIsSubmit(false);
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
  const onClickActionWishlist = async (action) => {
    if (action === 'add') {
      if (idUser === null) {
        message.warn("Login to do this");
        return;
      }
      const res = await wishlistApi.addToWishlist(idUser,game.idGame);
      if (res === 'created') {
        setIsWishList(true);
        message.success('Added '+ game.nameGame + ' to Wishlist')
      }
    } else {
      const res = await wishlistApi.removeToWishlist(idUser,game.idGame);
      if (res === 'deleted') {
        setIsWishList(false);
        message.success('Removed '+ game.nameGame + ' from Wishlist')
      }
    }
  };
  useEffect(() => {
    console.log()
    if (bill !== undefined) countDownTimeRefund();
  }, [bill]);
  const checkIsWishlist = async () => {
    if (idUser === null) {
      setIsWishList(false);
      return;
    }
    const res = await wishlistApi.checkIsWishlist(idUser,game.idGame);
    if (res === "found") setIsWishList(true);
      else setIsWishList(false);
  }
  const deleteGameOfDiscount = () => {
    axios.delete(Endpoint.mainApi + 'api/discount/delete/outdate/' + game.discount.idDiscount)
      .then(res => {
      })
  }
  const countDownTimeDiscount = () => {
    let timeEnd = moment(game.discount.endDate)
    .diff(moment(), 'second');
    if (timeEnd < 0) {
      deleteGameOfDiscount();
      return;    
    }
    setTimeDiscount(timeEnd);
    setTimeout(countDownTimeDiscount, 1000);
  };
  const checkTimeDiscount = () => {

    if (game.discount === null) return;
    let timeStart = moment().utc()
                        .diff(moment(game.discount.startDate), 'second');
    let timeEnd = moment(game.discount.endDate)
                        .diff(moment().utc(), 'second');
    if (timeStart>0) {
      if (timeEnd>0) {
        setTimeDiscount(timeEnd);
        countDownTimeDiscount();
        return;
      } 
    }
    if (timeEnd < 0) deleteGameOfDiscount();
  }
  useEffect(()=>{
    if (idUser !== null) checkIsWishlist(); else setIsWishList(false);
  },[idUser])

  useEffect(()=>{
    checkTimeDiscount();
  },[game])

  return (
    <div className='d-flex align-items-start column justify-content-end height-full'>
      <div className='width-full'>
        {game.discount !== null && timeDiscount>0 ? (
          <div>

            <div className='d-flex align-items-end'>
              <div className='bgr-discount pd-4-12 border-radius-4'>
                <span>-{game.discount.percentDiscount}%</span>
              </div>
              <div className='m-left-right-8'>
                <span className='gray-2 fs-12 lh-16 line-through'>
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
            <div style={{marginTop:'10px'}}>
              End on  <b> {secondsFormatHMS(timeDiscount)}</b>
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
              {
                isWishList ? 
                <div className='m-top-28 m-bottom-48' onClick={()=>{onClickActionWishlist('remove')}}>
                <div className='pd-8-16 width-full border-radius-4 pointer transition-dot-3 hover-buy border-1'>
                  <div className='d-flex'>
                    <p
                      className='m-0 center uppercase flex-1-1-auto'
                      style={{ cursor: 'pointer' }}>
                      Remove from wishlist
                    </p>
                    <span>
                      <i className='fa fa-minus-circle'></i>
                    </span>
                  </div>
                </div>
              </div> :
                <div className='m-top-28 m-bottom-48' onClick={()=>{onClickActionWishlist('add')}}>
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
              }
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
            <BuyComponent setIsSubmit={setIsSubmit} onSubmitPayment={onSubmitPayment} game={game} timeDiscount={timeDiscount} isSubmit = {isSubmit}/>
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
              isSubmit = {isSubmit}
              setIsSubmit={setIsSubmit}
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
