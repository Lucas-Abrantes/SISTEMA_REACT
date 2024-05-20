import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { registerPayment } from '../../utils/rotaPagamento/RotaPagamento';
import { updateSubscriptionStatus } from '../../utils/rotaInscrito/RotaInscrito';
import { fecthIdEvent } from '../../utils/rotaEvento/RotaEvento';

function CriarPagamento() {
    const { id } = useParams(); 
    const [value, setValue] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role;

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const eventData = await fecthIdEvent(id);
                if (eventData && eventData.price) {
                    setValue(eventData.price);
                } else {
                    toast.error('Falha ao obter o valor do evento.');
                }
            } catch (error) {
                console.error('Erro ao carregar o evento:', error);
                toast.error('Falha ao carregar o evento. Por favor, tente novamente.');
            }
        };
        if (id) {
            loadEvent();
        } else {
            console.log('Erro no id');
        }
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const numericValue = Number(value);
            if (isNaN(numericValue) || numericValue <= 0) {
                toast.error('Por favor, insira um valor válido maior que zero.');
                return;
            }
    
            const response = await registerPayment({
                value: numericValue,
                payment_method: paymentMethod,
                statusPayment: '1',
                payment_date: date
            });
    
            if (response.success && response.data.status === "1") {
                toast.success('Pagamento registrado com sucesso');
                setTimeout(async () => {
                    if (role === 'cliente') {
                        const subscriberId = JSON.parse(localStorage.getItem('subscriberId'));
                        const statusUpdateResponse = await updateSubscriptionStatus(subscriberId, '1');
                        navigate('/');
                        if (statusUpdateResponse.success) {
                            toast.success('Inscrição atualizada com sucesso');
                        }
                    } else if (role === 'admin') {
                        navigate('/tela_admin');
                    } else if (role === 'org') {
                        navigate('/tela_organizador');
                    } else {
                        navigate(`/`);
                    }
                }, 2000);
            } else {
                toast.error('Registro de pagamento falhou.');
            }
        } catch (error) {
            console.error("Erro no registro:", error.message);
        }
    };
    

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleRegister}>
                        <h3 className={styles.titulo_login}>Realizar pagamento</h3>
                        {role === 'cliente' && (
                            <div className={styles.text_label}>
                                <input
                                    type='text'
                                    value={value}
                                    id="value"
                                    name='value'
                                    placeholder='Digite o valor'
                                    required
                                    readOnly
                                />
                            </div>
                        )}
                    {(role === 'admin' || role === 'org') &&(
                        <div className={styles.text_label}>
                        <input
                            type='text'
                            value={value}
                            id="value"
                            name='value'
                            placeholder='Digite o valor'
                            required
                            onChange={e => setValue(e.target.value)}
                        />
                        </div>
                    )}
                       
                        <div className={styles.text_label}>
                            <select
                                className={styles.select_input}
                                name='paymentMethod'
                                id='paymentMethod'
                                required
                                onChange={e => setPaymentMethod(e.target.value)}
                            >
                                <option value="">Selecione o método de pagamento</option>
                                <option value="pix">Pix</option>
                                <option value="cartao">Cartão</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="boleto">Boleto</option>
                            </select>
                        </div>
                        <div className={styles.text_label}>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                placeholder="Formato: yyyy-mm-dd"
                                required
                                onChange={(e) => setDate(e.target.value)}
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

export default CriarPagamento;