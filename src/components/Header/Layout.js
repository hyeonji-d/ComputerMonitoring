import React from 'react'
import styles from './Layout.module.css';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({children, activeSidebar}) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.layout}>
            <Sidebar activeSidebar={activeSidebar} />
            <div className={styles.contents}> {children} </div>
            </div>
        </div>
    );
}

export default Layout;