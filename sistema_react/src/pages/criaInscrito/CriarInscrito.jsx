import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { registerSubscriber } from '../../utils/api';

function CriarInscrito() {
    const [userId, setUserId] = useState('');
    const [eventId, setEventId] = useState('');
    const [subscribeDate, setSubscribeDate] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role; 

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerSubscriber({
                user_id: userId,
                event_id: eventId,
                subscribe_date: subscribeDate,
                status: status
            });
            console.log("API Response:", response);

            if (response.success) {
                toast.success('Inscrição realizada com sucesso', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log("Acessado por:", role);
                if(role === 'admin'){
                    navigate('/tela_admin');
                }else{
                    navigate(`/evento/inscricoes/${id}/pagamentos`);
                }
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
                            <input type='text' id="userId" placeholder='ID do Usuário' required
                                onChange={e => setUserId(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="eventId" placeholder='ID do Evento' required
                                onChange={e => setEventId(e.target.value)}
                                className={styles.input}
                            />  
                        </div>
                        <div className={styles.text_label}>
                            <input type="text" placeholder='Formato: yyy-mm-dd' id="subscribeDate" required
                                onChange={(e) => setSubscribeDate(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="status" required
                                onChange={e => setStatus(e.target.value)}
                                className={styles.select_input}
                            ></input>
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