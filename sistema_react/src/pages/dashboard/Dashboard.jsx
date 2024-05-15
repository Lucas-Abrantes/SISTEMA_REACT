import React, { useState, useEffect } from 'react';

import styles from '../../ui/styles/Dashboard.module.css';
import { fetchAllEvents } from '../../utils/api';
import Classico from '../../assets/img/classico.jpeg';
import { useNavigate } from 'react-router-dom';

function Dashboard(){
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEventos = async () => {
            try {
                const eventosData = await fetchAllEvents();
                setEventos(eventosData);
            } catch (error) {
                console.error('Erro ao carregar eventos:', error);
            }
        };
        loadEventos();
    }, []);

    const handleSubscriber = (eventId) => {
        const user = localStorage.getItem('user'); 
        if (user) {
            navigate(`/evento/inscricoes/${eventId}`);
        } else {
            navigate('/login');
            alert('Por favor, faça login para se inscrever nos eventos.');
        }
    }

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
                    <article className={styles.show}>
                        <div className={styles.titulo}>
                                <h2 className={styles.titulo_eventos}>Nossos eventos</h2>
                            </div>
                        <div className={styles.atracoes}>
                            {eventos.slice(0,3).map((evento, index) => (

                                <div className={styles.evento_1}>
                                    <img className={styles.imagens} src={Classico} alt='Descrição do evento' />
                                    <h3>Nome: {evento.title}</h3>
                                    <time>Data: {evento.data.slice(0, 10)}</time>
                                    <p>Descrição: {evento.description}</p>
                                    <span>Valor {`R$ ${evento.price}`}</span>
                                    <button onClick={() => handleSubscriber(evento.id)} className={styles.subscriber}>Inscrever-se</button>
                                </div>

                            ))}
                        </div>
                    </article>
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