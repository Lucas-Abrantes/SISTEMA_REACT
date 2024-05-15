import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { registerEvent } from '../../utils/rotaEvento/RotaEvento';

function CriarEvento() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState('');
    const [location, setLocation] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const numericCapacity = parseInt(capacity);
            const numericPrice = parseFloat(price);
            if (isNaN(numericCapacity) || numericCapacity <= 0 || isNaN(numericPrice) || numericPrice < 0) {
                toast.error('Por favor, insira valores válidos para capacidade e preço.');
                return;
            }

            const response = await registerEvent({
                title,
                description,
                data: data,
                location,
                organizador,
                capacity: numericCapacity,
                price: numericPrice
            });
            console.log("API Response:", response);

            if (response.success) {
                toast.success('Evento criado com sucesso', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => navigate('/'), 2500); 
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Erro no registro:", error.message);
            toast.error("Falha ao registrar o evento. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleRegister}>
                        <h3 className={styles.titulo_login}>Criar Evento</h3>
                        <div className={styles.text_label}>
                            <input type='text' id="title" placeholder='Título do Evento' required
                                onChange={e => setTitle(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input id="description" placeholder='Descrição' required
                                onChange={e => setDescription(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type="text" id="date" placeholder="Data do Evento (yyyy-mm-dd)" required
                                onChange={(e) => setData(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="location" placeholder='Localização' required
                                onChange={e => setLocation(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="organizer" placeholder='Organizador' required
                                onChange={e => setOrganizador(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='number' id="capacity" placeholder='Capacidade' required
                                onChange={e => setCapacity(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='number' id="price" placeholder='Preço' required
                                onChange={e => setPrice(e.target.value)}
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

export default CriarEvento;