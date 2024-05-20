import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Painel.module.css';
import TabelaInscrito from '../tabela_inscritos/TabelaInscrito';
import TabelaPagamento from '../tabela_pagamentos/TabelaPagamento';
import Dinheiro from '../../../assets/img/dinheiro.png';
import Cadastro from '../../../assets/img/cadastro.png';
import Logout from '../../../assets/img/logout.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PainelUser() {
    const [activeTable, setActiveTable] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const tableComponents = {
        payments: () => <TabelaPagamento tableType="payments" />,
        subscribers: () => <TabelaInscrito tableType="subscribers" />
    };

    useEffect(() => {
        if (activeTable) {
            navigate(`/tela_usuario/${activeTable}`, { replace: true });
        }
    }, [activeTable, navigate]);

    const changeTable = (table) => {
        setActiveTable(table);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        toast.success("Logout bem sucedido!");
        setTimeout(() => {
            localStorage.clear();
            navigate('/login', { replace: true });
        }, 3000);
    };

    const TableComponent = tableComponents[activeTable];

    return (
        <div className={styles.container}>
            <div className={styles.container_user}>
                <div className={styles.menus}>
                    <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                        <div></div>
                        <div></div>
                    </div>
                    <ul className={`${styles.menus_user} ${menuOpen ? styles.show : ''}`}>
                        <li> <img className={styles.icons} src={Dinheiro} alt='pagamento'/> <button onClick={() => changeTable('payments')} className={styles.menuButton}>Pagamentos</button>
                        </li>
                        <li><img className={styles.icons} src={Cadastro} alt='inscritos'/> <button onClick={() => changeTable('subscribers')} className={styles.menuButton}>Inscrições</button></li>
                    </ul>
                    <div className={styles.logout}>
                        <img className={styles.icons} src={Logout} alt='sair'/>
                        <button onClick={handleLogout} className={styles.btn1}>Sair</button>
                    </div>
                </div>
            </div>
            {!activeTable && <div className={styles.welcome}>
                <h1 className={styles.nome}>Bem-vindo,  {user.name}!</h1>
            </div>}
            {TableComponent && <TableComponent />}
            <ToastContainer />
        </div>
    );
}

export default PainelUser;