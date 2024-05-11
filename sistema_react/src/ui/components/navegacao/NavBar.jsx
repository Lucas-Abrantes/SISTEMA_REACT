import React from 'react';
import styles from '../../styles/NavBar.module.css';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';


function NavBar(){

    const navigate = useNavigate();
    const handleCreateAccountClick = () => {
        navigate('/criar_conta');
    };

    const handleAccountClick = () => {
        navigate('/login');
    };
    
    return (
        <header className={styles.menuNav}>
            <div>
                <h3 className={styles.logo}>Group Events</h3>
            </div>
             <nav className={styles.navbar}>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/eventos">Eventos</Link></li>
                    <li className={styles.item}><Link to="/criar_conta" onClick={handleCreateAccountClick}>Criar conta</Link></li>
                    <li className={styles.item}><Link to="/login" onClick={handleAccountClick}>Conta</Link></li>
                </ul>
            </nav>
        </header>
         
    );
}

export default NavBar;