import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Layout, Card } from 'antd';
import styled from 'styled-components';

import { loadBlocks, selectBlock } from '../../reducer/ethereum';

const { Header, Content } = Layout;

const CustomHeader = styled(Header)`
  color: white;
`;
class LatestBlocks extends Component {
  componentDidMount() {
    this.props.loadBlocks();
  }

  handleSelectBlock = id => {
    const { blocks } = this.props;
    this.props.selectBlock(id);
    this.props.history.push(`/block/${blocks[id].number}`);
  };

  render() {
    const { proceeding, blocks } = this.props;
    const columns = [
      {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        render: text => <div>{ text }</div>
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
      <div>
        <Layout>
          <CustomHeader>The latest 10 blocks</CustomHeader>
          <Content>
            <Card>
              {proceeding && (
                <span>Loading...</span>
              )}
              {!proceeding && (<Table columns={columns} dataSource={blocks} />)}
            </Card>
          </Content>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  proceeding: state.ethereum.proceeding,
  blocks: state.ethereum.blocks
});

const mapDispatchToProps = {
  loadBlocks,
  selectBlock
};

LatestBlocks.protoTypes = {
  history: PropTypes.object.isRequired,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  proceeding: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlocks);
