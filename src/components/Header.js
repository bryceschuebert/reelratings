import React from 'react';
import { Layout } from 'antd';
import './AppHeader.css';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <h1>ReelRatings</h1>
    </Header>
  );
};

export default AppHeader;

