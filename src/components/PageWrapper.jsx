import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Layout, Card } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;

const CustomHeader = styled(Header)`
  color: white;
`;

const HomeLink = styled.button`
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  background: transparent;
  border: none;
  float: left;
`;

const Wrapper = ({ title, children, history }) => (
  <div>
    <Layout>
      <CustomHeader>
        {title}
        <HomeLink onClick={() => history.push('/')}>Home</HomeLink>
      </CustomHeader>
      <Content>
        <Card>
          {children}
        </Card>
      </Content>
    </Layout>
  </div>
);

Wrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.object.isRequired
};

Wrapper.defaultProps = {
  title: '',
  children: null
};

export default withRouter(Wrapper);
