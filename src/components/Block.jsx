import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ data }) => (
  <div>
    <a href={`/block/${data.number}`}>{ data.number }</a>
  </div>
);

Block.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Block;