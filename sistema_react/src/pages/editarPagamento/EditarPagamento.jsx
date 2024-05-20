import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdPayment, updatePayment } from '../../utils/rotaPagamento/RotaPagamento';

function EditarPagamento() {
    const [value, setValue] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayment = async () => {
            setLoading(true);
            try {
                const payment = await fecthIdPayment(id);
                setValue(payment.value);
                setPaymentMethod(payment.payment_method);
                setDate(payment.payment_date.slice(0, 10)); 
                setStatus(String(payment.status));

            } catch (error) {
                toast.error('Erro ao buscar detalhes do pagamento.');
            } finally {
                setLoading(false);
            }
        };
        fetchPayment();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;
            const role = user && user.role;
            const response = await updatePayment({ 
                id,
                value: Number(value),
                payment_method: paymentMethod,
                statusPayment: status,
                payment_date: date 
            });
            if (response.success) {
                toast.success('Pagamento atualizada com sucesso',{
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
            toast.error("Falha ao atualizar o pagamento. Por favor, tente novamente.");
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
                        <h3 className={styles.titulo_login}>Atualizar pagamento</h3>
                        {loading ? (
                            <div className={styles.loaderContainer}>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                        ) : (
                            <>
                                <div className={styles.text_label}>
                                    <input 
                                        type='number' 
                                        id="value" 
                                        name='value' 
                                        placeholder='Digite o valor' 
                                        required 
                                        value={value} 
                                        onChange={e => setValue(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <select
                                        className={styles.select_input}
                                        name='paymentMethod'
                                        id='paymentMethod'
                                        required 
                                        value={paymentMethod} 
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        disabled={loading}
                                    >
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
                                        placeholder="Formato: yyy-mm-dd" 
                                        required
                                        value={date} 
                                        onChange={(e) => setDate(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <select
                                        className={styles.select_input}
     
                                        type="text" 
                                        id="status" 
                                        name="status" 
                                        placeholder="status do pagamento" 
                                        required
                                        value={status} 
                                        onChange={e => setStatus(e.target.value)}
                                        disabled={loading}
                                    >
                                    <option value="">Selecione o status</option>
                                    <option value="1">Pago</option>
                                    <option value="0">Em aberto</option> 

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

export default EditarPagamento;