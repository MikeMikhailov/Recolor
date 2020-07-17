import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from 'antd.macro';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Header, Navigation } from '../General/Navbar';

function Navbar({ setDrawerUnfolded, drawerUnfolded, startSavingProgress, paletteColors }) {
  const history = useHistory();
  return (
    <Header>
      <Navigation>
        <Button onClick={setDrawerUnfolded}>
          {drawerUnfolded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
      </Navigation>
      <Navigation>
        <Button onClick={() => history.push('/')}>Go Back</Button>
        {paletteColors.length < 3 ? (
          <Tooltip placement="bottomRight" title="Palette should have at least 3 colors">
            <Button onClick={startSavingProgress} type="primary" disabled>
              Save Palette
            </Button>
          </Tooltip>
        ) : (
          <Button onClick={startSavingProgress} type="primary">
            Save Palette
          </Button>
        )}
      </Navigation>
    </Header>
  );
}

Navbar.propTypes = {
  drawerUnfolded: PropTypes.bool.isRequired,
  setDrawerUnfolded: PropTypes.func.isRequired,
  startSavingProgress: PropTypes.func.isRequired,
  paletteColors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  ).isRequired,
};

export default Navbar;
