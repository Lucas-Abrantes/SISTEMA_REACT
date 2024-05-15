import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { registerPayment } from '../../utils/rotaPagamento/RotaPagamento';
import {updateSubscriptionStatus} from '../../utils/rotaInscrito/RotaInscrito';

function CriarPagamento() {
    const [value, setValue] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [date, setDate] = useState(''); 
    const navigate = useNavigate();
    const subscriberId = JSON.parse(localStorage.getItem('subscriberId'));
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role; 



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
                const statusUpdateResponse = await updateSubscriptionStatus(subscriberId, '1');
                if (statusUpdateResponse.success) {
                    toast.success('Inscrição atualizada com sucesso');
                }
                role === 'admin' ? navigate('/tela_admin') : navigate(`/`);

            } else {
                toast.error('Registro de pagamento falhou.');
            }
        } catch (error) {
            console.error("Erro no registro:", error.message);
            toast.error("Falha ao registrar o pagamento. Por favor, tente novamente.");
        }
    };
    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleRegister}>
                        <h3 className={styles.titulo_login}>Realizar pagamento</h3>
                        <div className={styles.text_label}>
                            <input type='number' id="value" name='value' placeholder='Digite o valor' required 
                                onChange={e => setValue(e.target.value)}
                            />
                        </div>
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
                            <input type="text" id="date" name="date" placeholder="Formato: yyy-mm-dd" required
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