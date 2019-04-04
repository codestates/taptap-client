import React, { Component } from 'react';
import Search from './Search';
import Info from './Info';
import utils from '../../utils';
import './index.css';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    utils
      .fetchPostData('/stores/rewards/get-required', {
        storeID: this.props.location.state.id
      })
      .then(response => {
        this.setState({
          REQUIRED: response.REQUIRED,
          STORE_NAME: response.storeName
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.state = {
      // inital state
      isClickedAddCustomer: false,
      isClickedCustomer: false,
      // 로그인 성공시 받아오는 정보
      STORE_ID: this.props.location.state.id, // 매장 ID. 적립된 쿠폰 수 조회 및 손님등록시 필요
      // 컴포넌트 띄울때 가져올 정보
      REQUIRED: 0,
      STORE_NAME: '',
      // 손님 클릭시 가져올 정보
      couponsCount: 1, // 적립한 쿠폰 수
      customerID: null
    };
  }

  clickAddCustomer = () => {
    this.setState({
      isClickedAddCustomer: true,
      isClickedCustomer: false
    });
  };

  clickCustomer = id => {
    utils
      .fetchPostData('/stores/coupons/get-coupons-count', {
        customerID: id,
        storeID: this.state.STORE_ID
      })
      .then(response => {
        this.setState({
          isClickedAddCustomer: false,
          isClickedCustomer: true,
          couponsCount: response.count,
          customerID: id
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { clickAddCustomer, clickCustomer } = this;
    const {
      isClickedAddCustomer,
      isClickedCustomer,
      couponsCount,
      REQUIRED,
      STORE_NAME,
      STORE_ID,
      customerID
    } = this.state;
    return (
      <div className="container outerHeight">
        <div className="row outerHeight">
          <Search
            clickAddCustomer={clickAddCustomer}
            clickCustomer={clickCustomer}
          />
          <Info
            isClickedAddCustomer={isClickedAddCustomer}
            isClickedCustomer={isClickedCustomer}
            clickCustomer={clickCustomer}
            counts={{ count: couponsCount, REQUIRED }}
            idObject={{ customerID, storeID: STORE_ID, storeName: STORE_NAME }}
          />
        </div>
      </div>
    );
  }
}
