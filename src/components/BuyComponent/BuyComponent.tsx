import React, { useState } from "react";
import "../../layout/LayoutGameDetail1/styles.css";
import { Form, Input, Button } from "antd";
import './style.css';
import mastercardPng from './visa.png'
import MasterCardForm from './MasterCardForm';
import { GameDetailss, GameType } from "../../interfaces/rootInterface";
import numberWithCommas from "../../utils/numberWithCommas";
interface BuyComponentPropsType {
  onSubmitPayment: (card: any) => void;
  setIsSubmit: any;
  game: GameDetailss;
  timeDiscount: number;
  isSubmit: boolean;
}

const DEFAUL_CARD = {};

function BuyComponent({ onSubmitPayment,game,timeDiscount,isSubmit,setIsSubmit }: BuyComponentPropsType) {
  const [Err, setErr] = useState(false);
  const [strErr, setStrErr] = useState("");
  const handleSubmitPaymet = (value: any) => {
    let totalPayment=game.cost ;
    if (game.discount !== null) {
        totalPayment = (1 - game.discount.percentDiscount /100 )*game.cost;
    }
    if (totalPayment === 0) {
      onSubmitPayment(DEFAUL_CARD);
      return;
    }
    const card = {
      masterCardName: value.name,
      masterCardNumber: value.number.replaceAll(" ", ""),
      masterCardCCV: parseInt(value.ccv2),
      masterCardExpire: value.expirationDate.replaceAll(" ",""),
    };
    try {
      onSubmitPayment(card);
    } catch(e) {
    }

  };

  const formatCreddit = (e) => {
    console.log(e);
    var v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    var matches = v.match(/\d{0,16}/g);
    var match: string = (matches && matches[0]) || "";
    var parts = [];

    console.log(typeof match);

    for (var i = 0, len = match.length; i < len; i += 4) {}
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
  return (
    <div className="buy-content">
      <div
        id="error_display"
        className="checkout_error"
        style={{ display: Err === true ? "block" : "none" }}
      >
        {strErr}
      </div>
      <Form
        name="sign_in"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 50 }}
        onFinish={handleSubmitPaymet}
        onFinishFailed={()=>{setIsSubmit(false)}}
        layout="vertical"
        autoComplete="off"
      >
        <div className = "buy-form-content">
          <div> 
            <div className = "btn-method d-flex">
                 <img src = {mastercardPng} />
            </div>
            <br/>
            {game.discount?.percentDiscount === 100 || game.cost=== 0 ? null : <MasterCardForm></MasterCardForm>}
         
          </div>
          <div className = "buy-form-detail">
            <div className = "detail-payment-game">
              <div className="d-flex game-item-payment">
                <img src={game.imageGameDetail[0].url} />
                <div className="d-flex name-game-pay">
                  {game.nameGame}
                </div>
              </div>
              <br/>
              <div>
                <div>
                  Cost: <b> {numberWithCommas(game.cost)} </b>
                </div>
                {
                  game.discount !== null && timeDiscount>0 ? (
                    <div>
                      Discount {game.discount.title} | <b> -{game.discount.percentDiscount}% </b>
                      <div style={{marginTop:'10px'}}>
                        End on  <b> {secondsFormatHMS(timeDiscount)}</b>
                     </div>
                    </div>
                   
                  ) : null
                }
              </div>
            </div>
            <div>
              <div className = "d-flex space-between">
                <div>
                  Total Payment:
                </div>
                <div>
                  {game.discount !== null && timeDiscount>0 ?
                    <div>
                      {numberWithCommas(game.cost*(1 - game.discount.percentDiscount / 100))}
                    </div>
                    : 
                    <div>
                      {numberWithCommas(game.cost)}
                    </div>
                  }
                
                </div>
              </div>
              <br/>
              <Form.Item wrapperCol={{ offset: 0, span: 100 }}>
                <Button
                  loading = {isSubmit}
                  onClick={onSubmitPayment}
                  style={{ height: "40px", width: "300px"}}
                  className='bgr-green pd-8-16 width-full border-radius-4 uppercase full-width btn-pay"'
                  type = "primary"
                  htmlType="submit"
                >
                  Pay Now
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default BuyComponent;
