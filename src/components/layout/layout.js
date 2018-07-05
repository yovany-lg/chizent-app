import React from 'react';
import Menu from './menu';

const Layout = ({ children }) => (
  <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
    <Menu />
    <div className="container" style={{ marginTop: 25 }}>
      {children}
    </div>
  </div>
);

export default Layout;
