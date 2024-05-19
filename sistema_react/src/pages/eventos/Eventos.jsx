import React, { useState, useEffect } from 'react';
import NavBar from "../../ui/components/navegacao/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../ui/components/footer/Footer";
import styles from '../../ui/styles/Evento.module.css';
import { fetchAllEvents } from '../../utils/rotaEvento/RotaEvento';
import { useNavigate } from 'react-router-dom';
import imageMapping from '../../ui/components/eventosImg/ImageMapping';
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

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role;
    console.log(role);

    const handleSubscriber = async (eventId) => {
        if (role === 'admin' || role === 'org' || role === 'cliente') {
          navigate(`/evento/inscricoes/${eventId}`);
        } else {
          try {
            await toast.promise(
              toast.error('Acesse sua conta para se inscrever.', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }, setTimeout(() => navigate('/login'), 2500)) 
            )
          } catch (error) {
            console.error('Error showing toast:', error);
          }
        }
      };

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
                                <div className={styles.evento_1} key={evento.id}>
                                    <img className={styles.imagens} src={imageMapping[evento.id]} alt={`Imagem do evento ${evento.title}`} />
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
            <ToastContainer />
        </>
    );
}

export default Eventos;