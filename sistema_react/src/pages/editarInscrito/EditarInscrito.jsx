import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdSubscribe, updateSubscribe } from '../../utils/rotaInscrito/RotaInscrito'; 

function EditarInscrito() {
    const [name, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [eventId, setEventId] = useState('');
    const [subscribeDate, setSubscribeDate] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSub = async () => {
            setLoading(true);
            try {
                const subscription = await fecthIdSubscribe(id);
                setName(subscription.name);
                setTelefone(subscription.telefone);
                setEventId(subscription.event_id);
                setSubscribeDate(subscription.subscribe_date.slice(0,10));
                setStatus(subscription.status);
            } catch (error) {
                toast.error('Erro ao buscar detalhes da inscrição.');
            } finally {
                setLoading(false);
            }
        };
        fetchSub();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;
            const role = user && user.role;
            const response = await updateSubscribe({
                id,
                name,
                telefone,
                event_id: eventId,
                subscribe_date: subscribeDate,
                status,
            });
            if (response.success) {
                toast.success('Inscrição atualizada com sucesso',{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    if (role === 'admin') {
                        navigate('/tela_admin');
                    }else if(role === 'org'){
                        navigate('/tela_organizador')
                    }
                }, 2000);
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Erro na atualização:", error.message);
            toast.error("Falha ao atualizar a inscrição. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleUpdate}>
                        <h3 className={styles.titulo_login}>Atualizar Inscrição</h3>
                        {loading ? (
                            <div className={styles.loaderContainer}>
                                <ClipLoader size={30} color={"#123abc"} loading={loading} />
                            </div>
                        ) : (
                            <>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="user_id" 
                                        name='user_id' 
                                        placeholder='ID do Usuário' 
                                        required 
                                        value={name} 
                                        onChange={e => setName(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="telefone" 
                                        name='telefone' 
                                        placeholder='Numero de telefone' 
                                        required 
                                        value={telefone} 
                                        onChange={e => setTelefone(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="event_id" 
                                        name='event_id' 
                                        placeholder='ID do Evento' 
                                        required 
                                        value={eventId} 
                                        onChange={e => setEventId(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="subscribe_date" 
                                        name='subscribe_date' 
                                        placeholder='Data de Inscrição' 
                                        required 
                                        value={subscribeDate} 
                                        onChange={e => setSubscribeDate(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <select
                                        className={styles.select_input}
                                        id="status"
                                        name="status"
                                        value={status}
                                        onChange={e => setStatus(e.target.value)}
                                        disabled={loading}
                                    >
                                        <option value="">Selecione o status</option>
                                        <option value="1">Inscrito</option>
                                        <option value="0">Em Aberto</option>
                                    </select>
                                </div>
                                <button className={styles.btn} type='submit' disabled={loading}>
                                    {loading ? <ClipLoader size={20} color={"#ffffff"} /> : 'Atualizar'}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default EditarInscrito;