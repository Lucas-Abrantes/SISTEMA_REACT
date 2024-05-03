import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { register } from '../../utils/api';

function CriarConta() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Supondo que a função register envia os dados ao servidor e retorna uma resposta
            const response = await register({ name, email, password });
            console.log("API Response:", response);

            if (response.success) {
                toast.success('Conta criada com sucesso', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => navigate('/login'), 500); // Redireciona após o toast
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Erro no registro:", error.message);
            toast.error("Falha ao criar a conta. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleRegister}> 
                        <h3 className={styles.titulo_login}>Crie a sua conta</h3>
                        <div className={styles.text_label}>
                            <input type='text' id="nome" name='nome' placeholder='Digite o seu nome e sobrenome' required 
                                onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className={styles.text_label}>
                            <input type='email' id="email" name='email' placeholder='Digite o seu e-mail' required 
                                onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className={styles.text_label}>
                            <input type='password' id="senha" name='senha' placeholder='Digite a senha' required 
                                onChange={e => setPassword(e.target.value)}></input>
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

export default CriarConta;
