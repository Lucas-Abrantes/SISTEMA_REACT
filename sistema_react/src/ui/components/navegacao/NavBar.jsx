import React, {useState} from 'react';
import styles from '../../styles/NavBar.module.css';
import { Link, useNavigate, } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {
    const navigate = useNavigate();
    const [logoutToastShown, setLogoutToastShown] = useState(false);
    const [logoutInitiated, setLogoutInitiated] = useState(false);
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

    const handleLogout = () => {
        if (!logoutInitiated) {
            setLogoutInitiated(true);
            setTimeout(() => {
                setLogoutInitiated(false);
            }, 1000);

            if (!logoutToastShown) {
                toast.success("Logout bem sucedido!", {
                    onClose: () => {
                        localStorage.clear();
                        navigate('/', { replace: true });
                    }
                });
                setLogoutToastShown(true);
                setTimeout(() => {
                    setLogoutToastShown(false);
                }, 1000);
            }
        }
    };
    

    return (
        <>
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
        <ToastContainer />
        </>
    );
}

export default NavBar;