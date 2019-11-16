import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';
import styled from 'styled-components';

import PageWrapper from '../../components/PageWrapper';
import SearchBar from './TxSearchBar';
import { setTransactions, setProceedingStatus } from '../../reducer/ethereum';
import { selectedBlockSelector, getFilteredTransactions } from '../../selectors';
import { Web3 } from '../../services/web3.service';

const Info = styled.div`
  text-align: left;
  margin-bottom: 16px;
`;

const BlockContainer = ({
  block,
  proceeding,
  history,
  transactions,
  setTransactions,
  setProceedingStatus
}) => {
  if (!block) {
    history.push('/');
  }

  const web3 = new Web3();
  useEffect(() => {
    async function fetchTxns() {
      setProceedingStatus(true);
      web3.getTxnsFromBlock(
        block,
        data => setTransactions(data)
      );
    }

    fetchTxns();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block]);

  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'hash',
      key: 'hash',
      ellipsis: true
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      ellipsis: true
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      ellipsis: true
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: val => <span>{`${val / Math.pow(10, 18)} Ether`}</span>,
      width: 200
    }
  ];

  return (
    <PageWrapper title="Transactions Information">
      <Info>
        <h1>Transactions</h1>
        <Typography>For Block {block && block.number}</Typography>
      </Info>
      <SearchBar />
      <Table rowKey="hash" dataSource={transactions} loading={proceeding} columns={columns} />
    </PageWrapper>
  )
};

const mapStateToProps = state => ({
  block: selectedBlockSelector(state),
  proceeding: state.ethereum.proceeding,
  transactions: getFilteredTransactions(state)
});

const mapDispatchToProps = {
  setTransactions,
  setProceedingStatus
};

BlockContainer.propTypes = {
  block: PropTypes.object.isRequired,
  proceeding: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object),
  setTransactions: PropTypes.func.isRequired,
  setProceedingStatus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

BlockContainer.defaultProps = {
  transactions: []
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((BlockContainer)));
