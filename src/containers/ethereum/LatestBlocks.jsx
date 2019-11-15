import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Block from '../../components/Block';
import { loadBlocks } from '../../reducer/ethereum';

class LatestBlocks extends Component {
  componentDidMount() {
    this.props.loadBlocks();
  }

  render() {
    const { proceeding, blocks } = this.props;

    return (
      <div>
        <p>The latest blocks</p>
        {proceeding && (
          <span>Loading...</span>
        )}
        {!proceeding
          && !isEmpty(blocks)
          && blocks.map(
            (block, id) => (
              <Block key={id} data={block} />
            )
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  proceeding: state.ethereum.proceeding,
  blocks: state.ethereum.blocks
});

const mapDispatchToProps = { loadBlocks };

LatestBlocks.protoTypes = {
  history: PropTypes.object.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  proceeding: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlocks);
