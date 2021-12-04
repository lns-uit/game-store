import React from 'react';
import Fillter from '../../components/Fillters/Fillter';
import ListGameBrowse from '../../layout/ListGameBrowse/ListGameBrowse';
import FillterMobile from '../../components/Fillters/FillterMobile';
import {useLocation} from "react-router-dom";
import {Row,Col} from 'antd';
import './styles.css';
import { parse } from 'path';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function BrowseScreen() {
  const page = parseInt(useQuery().get('page')||'0');

  return(
    <div className="browse">
      <Row gutter={[8, 8]}>
        <Col
          xxl={6}
          xl={7}
          lg={9}
          md={8}
          sm={24}
          xs={24}
        >
          <div className="fillter-pc">
            <Fillter/>
          </div>
        </Col>
        <Col
          xxl={18}
          xl={17}
          lg={15}
          md={16}
          sm={24}
          xs={24}
        >
          <ListGameBrowse page={page}/>
        </Col>
      </Row>
    </div>
  );
}

export default BrowseScreen;