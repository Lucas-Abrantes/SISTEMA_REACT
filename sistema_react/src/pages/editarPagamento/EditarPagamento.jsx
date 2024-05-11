import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdPayment, updatePayment } from '../../utils/api';

function EditarPagamento() {
    const [value, setValue] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('')
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const payment = await fecthIdPayment(id);
                setValue(payment.value);
                setPaymentMethod(payment.payment_method);
                setDate(payment.payment_date.slice(0,10)); 
                setStatus(payment.status);
            } catch (error) {
                toast.error('Erro ao buscar detalhes do pagamento.');
            }
        };

        fetchPayment();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePayment({ 
                id,
                value: Number(value),
                payment_method: paymentMethod,
                statusPayment: '1',
                payment_date: date 
            });

            if (response.success) {
                toast.success('Pagamento atualizado com sucesso');
                setTimeout(() => navigate('/'), 2500); 
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Erro na atualização:", error.message);
            toast.error("Falha ao atualizar o pagamento. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleUpdate}>
                        <h3 className={styles.titulo_login}>Atualizar pagamento</h3>
                        <div className={styles.text_label}>
                            <input type='number' id="value" name='value' placeholder='Digite o valor' required 
                                value={value} onChange={e => setValue(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <select
                                className={styles.select_input}
                                name='paymentMethod'
                                id='paymentMethod'
                                required 
                                value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                            >
                                <option value="pix">Pix</option>
                                <option value="cartao">Cartão</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="boleto">Boleto</option>
                            </select>
                        </div>
                        <div className={styles.text_label}>
                            <input type="text" id="date" name="date" placeholder="Formato: yyy-mm-dd" required
                                value={date} onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className={styles.text_label}>
                            <input type="text" id="status" name="status" placeholder="status do pagamento" required
                                value={status} onChange={(e) => setDate(e.target.value)}
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

export default EditarPagamento;