import React from 'react';
import PropTypes from 'prop-types';

import { FlexBox } from './shared';

const Transaction = ({ data }) => (
  <FlexBox>
    <div>{data.hash}</div>
    <div>{data.from}</div>
    <div>{data.to}</div>
    <div>{`${data.value / Math.pow(10, 18)} Ether`}</div>
  </FlexBox>
);

Transaction.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Transaction;
