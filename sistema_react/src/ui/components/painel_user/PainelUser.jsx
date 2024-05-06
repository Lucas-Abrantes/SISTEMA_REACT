import styles from '../../styles/Painel.module.css';

function PainelUser(){

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };


    return(
        <div className={styles.container}>
        <div className={styles.container_user}>
            <div className={styles.menus}>
                <ul className={styles.menus_user}>
                    <li><a href='#a'>Eventos</a></li>
                    <li><a href='#a'>Pagamentos</a></li>
                </ul>
                <div className={styles.logout}>
                    <button onClick={handleLogout} className={styles.btn1}>Sair</button>
                </div>
            </div>
        </div>

        <div className={styles.content}>
            <div className={styles.pesquisa}>
                <div className={styles.pesquisa_user}>
                    <input type='text' placeholder='search'></input>
                </div>
                
            </div>

            <div className={styles.tabela}>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descricao</th>
                            <th>Data</th>
                            <th>Localizacao</th>
                            <th>Capacidade</th>
                            <th>Preco</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className={styles.botoes}>
                                    <span className={styles.acao}>
                                        <button className={styles.btnEditar}>Editar</button>

                                    </span>
                                    <span className={styles.acao}>
                                        <button className={styles.btnExcluir}>Ecluir</button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default PainelUser;