import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

const styles = {
  header: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    padding: '0px'
  },
  menu: {
    lineHeight: '64px',
    width: '100%'
  }
};

const AppBar = () => (
  <Header style={styles.header}>
    <Menu defaultSelectedKeys={['1']} mode="horizontal" style={styles.menu}>
      <Menu.Item key="1">
        <Icon type="search" /> Word Finder
      </Menu.Item>
    </Menu>
  </Header>
);

export default AppBar;
