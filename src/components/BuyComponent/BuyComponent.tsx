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
  game: GameDetailss;
}

const DEFAUL_CARD = {};

function BuyComponent({ onSubmitPayment,game }: BuyComponentPropsType) {
  const [Err, setErr] = useState(false);
  const [strErr, setStrErr] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmitPaymet = (value: any) => {
    setIsSubmit(true);
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
      setIsSubmit(false);
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
                  game.discount !== null ? (
                    <div>
                      Discount {game.discount.title} | <b> -{game.discount.percentDiscount}% </b>
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
                  {game.discount !== null ?
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
