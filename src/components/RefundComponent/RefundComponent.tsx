import React, { useState } from 'react';
import '../../layout/LayoutGameDetail1/styles.css';
import { Form, Input, Button } from 'antd';
import '../BuyComponent/style.css';
import {
  BillType,
  GameDetailss,
  GameType,
} from '../../interfaces/rootInterface';
import numberWithCommas from '../../utils/numberWithCommas';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

interface RefundComponentPropsType {
  onSubmitRefund: (card: any) => void;
  setIsSubmit: any;
  game: GameDetailss;
  bill: BillType | undefined;
  isSubmit: boolean;
}

const DEFAUL_CARD = {};

function RefundComponent({
  onSubmitRefund,
  game,
  bill,
  isSubmit,
  setIsSubmit
}: RefundComponentPropsType) {
  const [Err, setErr] = useState(false);
  const [strErr, setStrErr] = useState('');
  const handleSubmitPaymet = (value: any) => {
    let totalPayment = game.cost;
    if (game.discount !== null) {
      totalPayment = (1 - game.discount.percentDiscount / 100) * game.cost;
    }
    if (totalPayment === 0) {
      onSubmitRefund(DEFAUL_CARD);
      return;
    }
    const card = {
      masterCardNumber: value.number.replaceAll(' ', ''),
    };
    try {
      onSubmitRefund(card);
    }
    catch (e) {
    }
  };

  const formatCreddit = e => {
    console.log(e);
    var v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{0,16}/g);
    var match: string = (matches && matches[0]) || '';
    var parts = [];

    console.log(typeof match);

    for (var i = 0, len = match.length; i < len; i += 4) {}
  };
  return (
    <div className='buy-content'>
      <div
        id='error_display'
        className='checkout_error'
        style={{ display: Err === true ? 'block' : 'none' }}>
        {strErr}
      </div>
      <Form
        name='refund'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 50 }}
        onFinish={handleSubmitPaymet}
        onFinishFailed={()=>{setIsSubmit(false)}}
        layout='vertical'
        autoComplete='off'>
        <div className='buy-form-content'>
          <div className='refund-form-detail'>
            <div className='detail-payment-game' style={{ width: '100%' }}>
              <div className='d-flex game-item-payment'>
                <img src={game.imageGameDetail[0].url} />
                <div className='d-flex name-game-pay'>{game.nameGame}</div>
              </div>
              <br />
              <div>
                <div>
                  Date Bought:{' '}
                  <b>
                    {
                      <Moment format='HH:mm:ss | DD-MM-yyyy'>
                        {bill?.datePay}
                      </Moment>
                    }
                  </b>
                </div>
              </div>
            </div>
            <Form.Item
              name='number'
              label='CARD NUMBER TO REFUND MONEY'
              rules={[{ required: true, message: 'Please input card number!' }]}
              style={{ width: '100%' }}>
              <NumberFormat
                className='number-format-creddit'
                format='#### #### #### ####'
                placeholder='Card Number'
              />
            </Form.Item>
            <div>
              <div className='d-flex space-between'>
                <div>You bought at cost:</div>
                <div>{numberWithCommas(bill?.cost)}</div>
              </div>
              <br />
              <Form.Item wrapperCol={{ offset: 0, span: 100 }}>
                <Button
                  onClick={onSubmitRefund}
                  style={{ height: "40px", width: "400px" }}
                  className='bgr-green pd-8-16 width-full border-radius-4 uppercase full-width btn-pay"'
                  type = "primary"
                  htmlType="submit"
                  loading = {isSubmit}
                >
                  Refund Now
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default RefundComponent;
