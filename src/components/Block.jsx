import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { FlexBox } from './shared';

const Block = ({ data, onSelect }) => (
  <FlexBox>
    <div onClick={onSelect}>{ data.number }</div>
    <div>{`Miner: ${data.miner}`}</div>
    <div>{`${data.transactions.length} txns`}</div>
    <div>{data.timestamp}</div>
  </FlexBox>
);

Block.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withRouter(Block);