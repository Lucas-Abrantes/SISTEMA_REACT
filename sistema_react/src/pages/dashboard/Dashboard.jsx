import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Dashboard.module.css';
import { fetchAllEvents } from '../../utils/rotaEvento/RotaEvento';
import { useNavigate } from 'react-router-dom';
import imageMapping from '../../ui/components/eventosImg/ImageMapping';

function Dashboard() {
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

    const handleEvents= ()=>{
        navigate('/evento');
    }

    const handleSubscribers = async (eventId) => {
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
              }, setTimeout(()=> navigate('/login'), 2500)) 
            )
          } catch (error) {
            console.error('Error showing toast:', error);
          }
        }
      };   

    return (
        <>
            <ToastContainer />
            <div className={styles.hero}>
                <div className={styles.conteudo}>
                    <h1 className={styles.titulo}>Crie agora mesmo o seu evento no nosso site!</h1>
                    <p className={styles.descricao}>
                        Uma plataforma que facilita a compra de ingressos em todo o país. Venha conhecer um pouco mais.
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
                            {eventos.slice(0, 3).map((evento) => (
                                <div className={styles.evento_1} key={evento.id}>
                                    <img className={styles.imagens} src={imageMapping[evento.id]} alt='Descrição do evento' />
                                    <h3>Nome: {evento.title}</h3>
                                    <time>Data: {evento.data.slice(0, 10)}</time>
                                    <p>Descrição: {evento.description}</p>
                                    <span>Valor {`R$ ${evento.price}`}</span>
                                    <button onClick={() => handleSubscribers(evento.id)} className={styles.subscriber}>
                                        Inscrever-se
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.add_events}>
                            <button  onClick={handleEvents} className={styles.subscriber}>Mais eventos</button>
                        </div>
                    </article>
                </div>
            </div>
            <section className={styles.container_2}>
                <div className={styles.container_add}>
                    <h3 className={styles.titulo_container}>
                        Utilize um dos nossos aplicativos para gerenciar os seus ingressos.
                    </h3>
                    <p className={styles.container_app}>
                        Não perca tempo em filas! Use nosso app para facilitar sua entrada em eventos.
                    </p>
                    <a className={styles.link_container_2} href='#id'>Saiba mais</a>
                </div>
            </section>
        </>
    );
}


export default Dashboard;