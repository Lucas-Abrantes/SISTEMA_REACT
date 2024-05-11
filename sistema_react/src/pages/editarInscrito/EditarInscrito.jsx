import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdSubscribe, updateSubscribe } from '../../utils/api'; 

function EditarInscrito() {
    const [userId, setUserId] = useState('');
    const [eventId, setEventId] = useState('');
    const [subscribeDate, setSubscribeDate] = useState('');
    const [status, setStatus] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSub = async () => {
            try {
                const subscription = await fecthIdSubscribe(id);
                setUserId(subscription.user_id);
                setEventId(subscription.event_id);
                setSubscribeDate(subscription.subscribe_date.slice(0,10));
                setStatus(subscription.status);
            } catch (error) {
                toast.error('Erro ao buscar detalhes da inscrição.');
            }
        };

        fetchSub();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateSubscribe({
                id,
                user_id: userId,
                event_id: eventId,
                subscribe_date: subscribeDate,
                status
            });

            if (response.success) {
                toast.success('Inscrição atualizada com sucesso');
                setTimeout(() => navigate('/'), 2500); 
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Erro na atualização:", error.message);
            toast.error("Falha ao atualizar a inscrição. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleUpdate}>
                        <h3 className={styles.titulo_login}>Atualizar Inscrição</h3>
                        <div className={styles.text_label}>
                            <input type='text' id="user_id" name='user_id' placeholder='ID do Usuário' required 
                                value={userId} onChange={e => setUserId(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="event_id" name='event_id' placeholder='ID do Evento' required 
                                value={eventId} onChange={e => setEventId(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="subscribe_date" name='subscribe_date' placeholder='Data de Inscrição' required 
                                value={subscribeDate} onChange={e => setSubscribeDate(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="status" name='status' placeholder='Status' required 
                                value={status} onChange={e => setStatus(e.target.value)}
                            />
                        </div>
                        <button className={styles.btn} type='submit'>Atualizar</button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default EditarInscrito;
