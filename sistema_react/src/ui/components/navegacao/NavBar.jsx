import React from 'react';

import styles from '../../styles/NavBar.module.css';
import { Link } from 'react-router-dom'; 

function NavBar(){

    return (
        <header className={styles.menuNav}>
             <nav className={styles.navbar}>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/eventos">Eventos</Link></li>
                    <li className={styles.item}><Link to="/criar_conta">Criar conta</Link></li>
                    <li className={styles.item}><Link to="/conta">Conta</Link></li>
                </ul>
            </nav>
        </header>
         
    );
}

export default NavBar;
