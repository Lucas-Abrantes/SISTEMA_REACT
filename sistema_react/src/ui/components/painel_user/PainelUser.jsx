import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Painel.module.css';
import TabelaEvento from '../tabela_eventos/TabelaEvento';
import TabelaInscrito from '../tabela_inscritos/TabelaInscrito';
import TabelaPagamento from '../tabela_pagamentos/TabelaPagamento';


function PainelUser() {
    const [activeTable, setActiveTable] = useState(''); 
    const navigate = useNavigate();
    const tableComponents = {
        events: () => <TabelaEvento tableType="events" />,
        payments: () => <TabelaPagamento tableType="payments" />,
        subscribers: () => <TabelaInscrito tableType="subscribers" />
    };
    useEffect(() => {
        navigate(`/tela_usuario/${activeTable}`, { replace: true });
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
                        <li><button onClick={() => changeTable('events')} className={styles.menuButton}>Eventos</button></li>
                        <li><button onClick={() => changeTable('payments')} className={styles.menuButton}>Pagamentos</button></li>
                        <li><button onClick={() => changeTable('subscribers')} className={styles.menuButton}>Inscritos</button></li>
                    </ul>
                    <div className={styles.logout}>
                        <button onClick={handleLogout} className={styles.btn1}>Sair</button>
                    </div>
                </div>
            </div>
            
            {TableComponent && <TableComponent />}
        </div>
    );
}

export default PainelUser;