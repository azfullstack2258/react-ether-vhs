import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';
import styled from 'styled-components';

import PageWrapper from '../../components/PageWrapper';
import SearchBar from './TxSearchBar';
import { loadTransactions } from '../../reducer/ethereum';
import { selectedBlockSelector, getFilteredTransactions } from '../../selectors';

const Info = styled.div`
  text-align: left;
  margin-bottom: 16px;
`;

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
        <Typography>For Block {block.number}</Typography>
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
  loadTransactions,
};

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
