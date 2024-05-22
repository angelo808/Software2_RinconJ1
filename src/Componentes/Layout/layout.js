import React from 'react';
import Header from '../Header/header';
import Nav from '../Nav/nav';
import Sidebar from '../Sidebar/sidebar';
import './layout.css';

function Layout({ children, sidebarItems }) {
  return (
    <div className="layout">
      <Header />
      <Nav />
      <div className="content">
      <Sidebar items={sidebarItems} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

