import React, { useState, useEffect } from 'react';
import NavBar from "../../ui/components/navegacao/NavBar";
import Footer from "../../ui/components/footer/Footer";
import styles from '../../ui/styles/Evento.module.css';
import { fetchAllEvents } from '../../utils/rotaEvento/RotaEvento';
import Classico from '../../assets/img/classico.jpeg';
import { useNavigate } from 'react-router-dom';


function Eventos() {
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

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.principal}>
                    <article className={styles.show}>
                        <div className={styles.titulo}>
                            <h2>Nossos eventos</h2>
                        </div>
                        <div className={styles.atracoes}>
                            {eventos.map((evento, index) => (

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
            <Footer />
        </>
    );
}

export default Eventos;