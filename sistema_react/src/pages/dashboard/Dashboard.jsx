import React from 'react';
import styles from '../../ui/styles/Dashboard.module.css';

function Dashboard(){
    return(
        <>
            <div className={styles.hero}>
                <div className={styles.conteudo}>
                    <h1 className={styles.titulo}>Crie agora mesmo o seu evento no nosso site!</h1>
                    <p className={styles.descricao}>Uma platarfoma que facilita a compra de ingressos em todo o país.
                        Venha conhecer um pouco mais.
                    </p>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.principal}>
                    <section className={styles.show}>
                        <h2>Nossos eventos</h2>
                        <div className={styles.atracoes}>
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>                          
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>                          
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>                           
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>                          
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>                          
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>                          
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>
                            <a href='#id'>
                                <div className={styles.evento_1}>
                                    <img src='' alt='descricao da banda'/>
                                    <h3>Banda 1</h3>
                                    <time>02/05/2024</time>
                                </div>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
            <section className={styles.container_2}>
                <div className={styles.container_add}>
                    <h3 className={styles.titulo_container}>Utilize um dos nossos aplicativos para gerenciar
                        os seu ingressos.
                    </h3>
                    <p className={styles.container_app}>Não perca tempo em filas! Use nosso app para facilitar 
                        sua entrada em eventos
                    </p>
                    <a className={styles.link_container_2} href='#id'>Saiba mais</a>
                </div>
            </section>
        </>     
    );
}

export default Dashboard;