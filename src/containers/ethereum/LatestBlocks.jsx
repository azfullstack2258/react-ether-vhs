import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button } from 'antd';
import styled from 'styled-components';

import PageWrapper from '../../components/PageWrapper';
import { setBlocks, selectBlock, setProceedingStatus } from '../../reducer/ethereum';
import { Web3 } from '../../services/web3.service';

const BlockLink = styled.div`
  color: #1890ff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

class LatestBlocks extends Component {
  componentDidMount() {
    this.web3 = new Web3();
    this.onLoad();
  }

  onLoad = () => {
    this.props.setProceedingStatus(true);
    this.web3.getLatestBlocks(
      data => this.props.setBlocks(data)
    );
  };

  handleSelectBlock = number => {
    const { blocks } = this.props;
    for (let i = 0; i < 10; i ++) {
      if (blocks[i].number === number) {
        this.props.selectBlock(blocks[i]);
        this.props.history.push(`/block/${blocks[i].number}`);
        break;
      }
    }
  };

  render() {
    const { proceeding, blocks } = this.props;
    console.log(blocks)
    const columns = [
      {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        render: number => <BlockLink onClick={() => this.handleSelectBlock(number)}>{ number }</BlockLink>
      },
      {
        title: 'Tx Count',
        dataIndex: 'transactions',
        key: 'txCount',
        render: txns => <span>{`${txns.length} txns`}</span>
      },
      {
        title: 'Collated at',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: val => {
          const fromNow = moment(new Date(val * 1000)).fromNow();

          return <div>{ fromNow }</div>;
        }
      }
    ];

    return (
      <PageWrapper title="The latest 10 blocks">
        <div style={{ marginBottom: 16 }}>
          <Button type="primayr" onClick={this.onLoad} disabled={proceeding} loading={proceeding}>Refresh</Button>
        </div>
        <Table rowKey="number" columns={columns} dataSource={blocks} loading={proceeding} />
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  proceeding: state.ethereum.proceeding,
  blocks: state.ethereum.blocks
});

const mapDispatchToProps = {
  setBlocks,
  selectBlock,
  setProceedingStatus
};

LatestBlocks.protoTypes = {
  history: PropTypes.object.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  proceeding: PropTypes.bool.isRequired,
  setBlocks: PropTypes.func.isRequired,
  selectBlock: PropTypes.func.isRequired,
  setProceedingStatus: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlocks);
