import React from 'react';
import styles from '../../styles/NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom'; 

function NavBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role;

    const handleEvent = () => {
        navigate('/evento');
    };

    const handleCreateAccountClick = () => {
        navigate('/criar_conta');
    };

    const handleDashboard = () => {
        navigate('/');
    };

    const handleLogout = ()=>{
        localStorage.clear();
        navigate('/');
    }

    const handleAccountClick = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn && role === 'cliente') {
            navigate('/tela_usuario');
        } else if (isLoggedIn && role === 'admin') {
            navigate('/tela_admin');
        }else if (isLoggedIn && role === 'org') {
            navigate('/tela_organizador');
        } 
        else {
            navigate('/login');
        }
    };

    return (
        <header className={styles.menuNav}>
            <div className={styles.container_logo}>
                <h3 onClick={handleDashboard} className={styles.logo}>Group Events</h3>
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/evento" onClick={handleEvent}>Eventos</Link></li>
                    <li className={styles.item}><Link to="/criar_conta" onClick={handleCreateAccountClick}>Criar conta</Link></li>
                    <li className={styles.item}><Link to="#" onClick={handleAccountClick}>Conta</Link></li>
                    <li className={styles.item}><Link to="#" onClick={handleLogout}>Sair</Link></li>

                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
