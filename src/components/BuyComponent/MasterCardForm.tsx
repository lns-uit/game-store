import { Form, Input, Button } from "antd";
import React, { useState } from "react";
import NumberFormat from "react-number-format";

function MasterCardForm() {
    return(
    <div className="mastercard-container">
        <div style={{ textAlign: "left", position: "relative" }}>
          <Form.Item
            name="number"
            label="CARD NUMBER"
            rules={[{ required: true, message: "Please input card number!" }]}
          >
            <NumberFormat
              className="number-format-creddit"
              format="#### #### #### ####"
              placeholder="Card Number"
              
            />
          </Form.Item>
          <div className="visa-card">
            {/* <img src={visa} alt="master card" style={{objectFit:'cover'}} /> */}
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <Form.Item
            name="name"
            label="FULL NAME"
            rules={[{ required: true, message: "Please input full name!" }]}
          >
            <Input
                className="number-format-creddit"
                placeholder="Full name"
            />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ textAlign: "left" }}>
            <Form.Item
              name="ccv2"
              label="CCV"
              rules={[{ required: true, message: "Please input your CCV!" }]}
            >
              <NumberFormat
                className="number-format-creddit"
                placeholder="CCV"
                format="###"
              />
            </Form.Item>
          </div>

          <div style={{ textAlign: "left" }}>
            <Form.Item
              name="expirationDate"
              label="EXPIRATION DATE"
              rules={[
                {
                  required: true,
                  message: "Please input your expiration date!",
                },
              ]}
            >
              <NumberFormat
              className="number-format-creddit"
              format="## / ##"
              placeholder="##/##"
              
            />
            </Form.Item>
          </div>
        </div>
    </div>
    )
}

export default MasterCardForm;