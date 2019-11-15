import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button, Select } from 'antd';
import styled from 'styled-components';

import { setQueryFrom, setQueryTo, setQueryValue, clearFilter } from '../../reducer/search';
import { getAvailableValues } from '../../selectors';

const { Search } = Input;
const { Option } = Select;

const FilterBar = styled.div`
  text-align: left;
`;

const TxSearchBar = ({
  from,
  to,
  value,
  values,
  setQueryFrom,
  setQueryTo,
  setQueryValue,
  clearFilter
}) => {
  const handleChange = name => e => {
    switch(name) {
      case 'from':
        setQueryFrom(e.target.value);
        break;
      case 'to':
        setQueryTo(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <FilterBar>
      <Search
        addonBefore="From"
        placeholder="Input search address"
        value={from}
        onChange={handleChange('from')}
        style={{width: 200, marginRight: 20}}
      />
      <Search
        addonBefore="To"
        placeholder="Input search address"
        value={to}
        onChange={handleChange('to')}
        style={{width: 200, marginRight: 20}}
      />
      <Select
        size="default"
        value={value}
        onChange={v => setQueryValue(v)}
        style={{width: 200, marginRight: 20}}
      >
        <Option value={null}>All</Option>
        {values.map((v, id) => <Option key={id} value={v}>{`${v} Ether`}</Option>)}
      </Select>
      <Button type="primary" onClick={clearFilter}>Clear Filter</Button>
    </FilterBar>
  );
};

const mapStateToProps = state => ({
  from: state.search.from,
  to: state.search.to,
  value: state.search.value,
  values: getAvailableValues(state)
});

const mapDispatchToProps = {
  setQueryFrom,
  setQueryTo,
  setQueryValue,
  clearFilter
};

TxSearchBar.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  value: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.number),
  setQueryFrom: PropTypes.func.isRequired,
  setQueryTo: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
};

TxSearchBar.defaultProps = {
  from: '',
  to: '',
  value: null,
  values: []
};

export default connect(mapStateToProps, mapDispatchToProps)(TxSearchBar);
