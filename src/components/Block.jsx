import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const Block = ({ data, onSelect }) => (
  <div>
    <div onClick={onSelect}>{ data.number }</div>
  </div>
);

Block.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withRouter(Block);