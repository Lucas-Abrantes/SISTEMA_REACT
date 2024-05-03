// src/components/Login.jsx
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '../../utils/api'; // Importando a função login

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password); // Obter a resposta da API
            
            console.log("API Response:", response); // Vamos logar a resposta para ver a estrutura
            
            if (response.success && response.data.role) { // Verifique se a role existe
                if (response.data.role === 'admin') {
                    navigate('/tela_admin'); // Rota para admin
                } else if (response.data.role === 'cliente') {
                    navigate('/tela_usuario'); // Rota para cliente
                } else {
                    throw new Error("User role is not defined or unauthorized");
                }
            } else {
                throw new Error("Login failed or user role missing");
            }
        } catch (error) {
            console.error("Erro de login:", error.message);
        }
    };


    const handleCreateAccountClick = () => {
        navigate('/criar_conta');
    };

    return (
        <>
            <NavBar/>
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleLogin}> 
                        <h3 className={styles.titulo_login}>Acesse já a sua conta</h3>                  
                        <div className={styles.text_label}>
                            <input type='email' id="email" name='email' placeholder='Digite o seu e-mail' required onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className={styles.text_label}>
                            <input type='password' id="senha" name='senha' placeholder='Digite a senha' required onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <button className={styles.btn} type='submit'>Enviar</button>
                        <button className={styles.conta_user2} onClick={handleCreateAccountClick}>Ainda não tem uma conta?</button>

                    </form>                         
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Login;
