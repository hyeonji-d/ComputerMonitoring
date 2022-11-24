import React from 'react'
import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.header}>
            <img className = { styles.icon } src = "pageImg/monitor.png"/>
            <div className={styles.text}>
            <img className = { styles.phoneImage } alt="computer" src="giphy.gif" /> Computer Monitoring
            </div>
        </div>
    );
}

export default Header;