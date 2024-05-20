import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { registerSubscriber } from '../../utils/rotaInscrito/RotaInscrito';
import { fecthIdEvent } from '../../utils/rotaEvento/RotaEvento';

function CriarInscrito() {
    const [name, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [eventId, setEventId] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [subscribeDate, setSubscribeDate] = useState('');
    const [status, setStatus] = useState('0');
    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role;

    useEffect(() => {
        if (id) {
            setEventId(id);
            fecthIdEvent(id).then(data => {
                setEventTitle(data.title);
            }).catch(error => {
                console.error('Erro ao buscar detalhes do evento:', error);
                toast.error('Erro ao carregar detalhes do evento.');
            });
        }
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerSubscriber({
                name: name,
                telefone: telefone,
                event_id: eventId,
                subscribe_date: subscribeDate,
                status: status
            });
            console.log("API Response:", response);

            if (response.success) {
                localStorage.setItem('subscriberId', JSON.stringify(response.data.id));

                toast.success('Inscrição realizada com sucesso', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    console.log("Acessado por:", role);
                    if(role === 'admin'){
                        navigate('/tela_admin');
                    }else if(role ==='org'){
                        navigate('/tela_organizador');
                    }
                    
                    else{
                        navigate(`/evento/inscricoes/${id}/pagamentos`);
                    }
                }, 2100);
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Erro no registro:", error.message);
            toast.error("Falha ao registrar inscrito. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleRegister}>
                        <h3 className={styles.titulo_login}>Inscrever-se</h3>
                        <div className={styles.text_label}>
                            <input type='text' id="name" placeholder='Digite nome e sobrenome' required
                               value={name} onChange={e => setName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="telefone" placeholder='Digite o numero do celular' required
                               value={telefone} onChange={e => setTelefone(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' value={eventTitle} className={styles.input} readOnly />
                        </div>

                        <input type="hidden" name="event_id" value={eventId} />
                        <div className={styles.text_label}>
                            <input type="text" placeholder='Formato: yyyy-mm-dd' id="subscribeDate" required
                                onChange={(e) => setSubscribeDate(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <button className={styles.btn} type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default CriarInscrito;