import React from 'react';
import './styles.css';
import { dotNumber } from '../../utils/index';
import { GameDetailss } from '../../interfaces/rootInterface';
import Moment from 'react-moment';

interface Detail {
  game: GameDetailss;
}

function PriceGame({ game }: Detail) {
  const { cost, developer, publisher, releaseDate, plaform, discount } = game;
  const { percentDiscount = 0 } = discount;
  return (
    <div className='d-flex align-items-start column justify-content-end height-full'>
      <div className='width-full'>
        {discount !== null ? (
          <div className='d-flex align-items-end'>
            <div className='bgr-blue1 pd-4-12 border-radius-4'>
              <span>-{percentDiscount}%</span>
            </div>
            <div className='m-left-right-8'>
              <span className='gray-2 fs-12 lh-16'>{dotNumber(cost)}₫</span>
            </div>
            <div className='m-left-8'>
              <span className='fs-12 lh-16'>
                {dotNumber((percentDiscount / 100) * cost)}₫
              </span>
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-end'>
            <div className='m-left-8'>
              <span className='fs-12 lh-16'>{dotNumber(cost)}₫</span>
            </div>
          </div>
        )}
        <div className='m-top-36'>
          <div className='bgr-blue1 pd-8-16 width-full border-radius-4 pointer hover-buy transition-dot-3'>
            <p className='m-0 center uppercase'>Buy Now</p>
          </div>
        </div>
        <div className='m-top-28 m-bottom-48'>
          <div className='pd-8-16 width-full border-radius-4 pointer transition-dot-3 hover-buy border-1'>
            <div className='d-flex'>
              <p className='m-0 center uppercase flex-1-1-auto'>
                add to wishlist
              </p>
              <span>
                <i className='fa fa-plus-circle'></i>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Developer</p>
            <p className='m-0 fs-12 lh-21'>{developer}</p>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Publisher</p>
            <p className='m-0 fs-12 lh-21'>{publisher}</p>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Release Date</p>
            <Moment format='DD-MM-yyyy'>{releaseDate}</Moment>
          </div>
          <div
            className={
              3 === 3
                ? 'd-flex border-top-bottom-gray pd-top-bottom-22 space-between'
                : 'd-flex border-top-gray pd-top-bottom-22 space-between'
            }>
            <p className='gray-3 m-0 fs-12 lh-21'>Plaform</p>
            <p className='m-0 fs-12 lh-21'>{plaform}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceGame;
