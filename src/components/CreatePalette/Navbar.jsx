import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Header, Navigation } from '../General/Navbar';

const Heading = styled.h3`
  color: #363636;
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin: 0px;
  font-weight: bold;
`;

function Navbar({ setUnfolded, unfolded }) {
  const history = useHistory()
  return (
    <Header>
      <Navigation>
        <Button onClick={setUnfolded}>
          {unfolded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
        <Heading>Create new palette!</Heading>
      </Navigation>
      <Navigation>
        <Button onClick={() => history.push('/')}>Go Back</Button>
        <Button type="primary">Save Palette</Button>
      </Navigation>
    </Header>
  );
}

Navbar.propTypes = {
  setUnfolded: PropTypes.func.isRequired,
  unfolded: PropTypes.bool.isRequired,
};

export default Navbar;
