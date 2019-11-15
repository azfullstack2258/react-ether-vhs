import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Transaction from '../../components/Transaction';
import { loadTransactions } from '../../reducer/ethereum';
import { selectedBlockSelector } from '../../selectors';

const BlockContainer = ({
  block,
  proceeding,
  transactions,
  loadTransactions
}) => {
  useEffect(() => {
    loadTransactions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.number]);

  return (
    <>
      <div>Block {block.number}</div>
      {proceeding && <p>Loading...</p>}
      {!proceeding &&
          transactions.map((tx, id) => <Transaction key={id} data={tx} />)
      }
    </>
  )
};

const mapStateToProps = state => ({
  block: selectedBlockSelector(state),
  proceeding: state.ethereum.proceeding,
  transactions: state.ethereum.transactions
});

const mapDispatchToProps = { loadTransactions };

BlockContainer.propTypes = {
  block: PropTypes.object.isRequired,
  proceeding: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object),
  loadTransactions: PropTypes.func.isRequired,
};

BlockContainer.defaultProps = {
  transactions: []
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockContainer);
