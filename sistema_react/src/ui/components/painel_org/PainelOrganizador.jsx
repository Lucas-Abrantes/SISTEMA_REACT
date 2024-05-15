import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Painel.module.css';
import TabelaUsuario from '../tabela_usuario/TabelaUsuario';
import TabelaEvento from '../tabela_eventos/TabelaEvento';
import TabelaInscrito from '../tabela_inscritos/TabelaInscrito';
import TabelaPagamento from '../tabela_pagamentos/TabelaPagamento';
import Dinheiro from '../../../assets/img/dinheiro.png';
import Cadastro from '../../../assets/img/cadastro.png';
import Logout from '../../../assets/img/logout.png';
import User from '../../../assets/img/user.png';
import Bilhete from '../../../assets/img/bilhete.png';


function PainelOrganizador() {
    const [activeTable, setActiveTable] = useState(''); 
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const tableComponents = {
        users: TabelaUsuario,
        events: TabelaEvento,
        payments: TabelaPagamento,
        subscribers: TabelaInscrito
    };

    useEffect(() => {
        navigate(`/tela_organizador/${activeTable}`, { replace: true });
    }, [activeTable, navigate]);

    const changeTable = (table) => {
        setActiveTable(table);
    };

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/login', { replace: true }); 
    };

    const TableComponent = tableComponents[activeTable];

    return (
        <div className={styles.container}>
            <div className={styles.container_user}>
                <div className={styles.menus}>
                    <ul className={styles.menus_user}>
                        <li><img className={styles.icons} src={User} alt="usuario" /> <button onClick={() => changeTable('users')} className={styles.menuButton}>Usuarios</button></li>
                        <li><img className={styles.icons} src={Bilhete} alt="eventos" /> <button onClick={() => changeTable('events')} className={styles.menuButton}>Eventos</button></li>
                        <li><img className={styles.icons} src={Dinheiro} alt="pagamentos" /> <button onClick={() => changeTable('payments')} className={styles.menuButton}>Pagamentos</button></li>
                        <li><img className={styles.icons} src={Cadastro} alt="inscricoes" /> <button onClick={() => changeTable('subscribers')} className={styles.menuButton}>Inscrições</button></li>
                    </ul>
                    <div className={styles.logout}>
                        <img className={styles.icons} src={Logout} alt="sair" /> 
                        <button onClick={handleLogout} className={styles.btn1}>Sair</button>
                    </div>
                </div>
            </div>
            {!activeTable && <div className={styles.welcome}>
                <h1 className={styles.nome}>Bem-vindo,  {user.name}!</h1>
            </div>}
            {TableComponent && <TableComponent />}
        </div>
    );
}

export default PainelOrganizador;