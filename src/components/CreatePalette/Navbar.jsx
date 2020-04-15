import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Header, Navigation } from '../General/Navbar';
import { primaryTextColor } from '../../constants/globalColors';

const Heading = styled.h3`
  color: ${primaryTextColor};
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin: 0px;
`;

function Navbar({ setDrawerUnfolded, drawerUnfolded }) {
  const history = useHistory();
  return (
    <Header>
      <Navigation>
        <Button onClick={setDrawerUnfolded}>
          {drawerUnfolded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
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
  setDrawerUnfolded: PropTypes.func.isRequired,
  drawerUnfolded: PropTypes.bool.isRequired,
};

export default Navbar;
