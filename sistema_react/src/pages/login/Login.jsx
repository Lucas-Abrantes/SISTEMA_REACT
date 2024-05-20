import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { login } from '../../utils/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(email, password);

            console.log("API Response:", response);

            if (response.success && response.data.role) {
                console.log("User role:", response.data.role);

                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('isLoggedIn', 'true');

                if (response.data.role === 'admin') {
                    navigate('/tela_admin');
                } else if(response.data.role === 'cliente') {
                    navigate('/tela_usuario');
                } else if(response.data.role === 'org') {
                    navigate('/tela_organizador/');
                } else {
                    throw new Error("User role is not defined or unauthorized");
                }
            } else {
                toast.error(response.message || "Login failed or user role missing");
            }
        } catch (error) {
            console.error("Erro de login:", error.message);
            toast.error("Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
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
                            <input
                                type='email'
                                id="email"
                                name='email'
                                placeholder='Digite o seu e-mail'
                                required
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input
                                type='password'
                                id="senha"
                                name='senha'
                                placeholder='Digite a senha'
                                required
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <button className={styles.btn} type='submit' disabled={loading}>
                            {loading ? <ClipLoader size={20} color={"#ffffff"} /> : 'Enviar'}
                        </button>
                        <button
                            className={styles.conta_user2}
                            onClick={handleCreateAccountClick}
                            disabled={loading}
                        >
                            Ainda não tem uma conta?
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
            <ToastContainer />
        </>
    );
}

export default Login;