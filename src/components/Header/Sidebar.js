import React from 'react';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';



function Sidebar({activeSidebar}) {
    return (
            <div className={styles.menu}>
                <Link to="/" className={styles.link}>
                <img className={styles.icon} src="pageImg/home.png" /> Home </Link>
            
                <Link to="/cpu" className={styles.link}>
                    <img className={styles.icon} src="pageImg/cpu.png" /> CPU</Link>
            
                <Link to="/memory" className={styles.link}>
                    <img className={styles.icon} src="pageImg/mem.png" /> Memory</Link>
            
                <Link to="/hdd" className={styles.link}>
                    <img className={styles.icon} src="pageImg/hdd.png" /> HDD</Link>
            </div>
      
    );
}

export default Sidebar;
