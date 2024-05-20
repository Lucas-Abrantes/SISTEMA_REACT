import React, { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { register } from '../../utils/rotaUusario/RotaUsuario';

function CriarConta() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role;

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
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
                 setTimeout(() => {
                    console.log("Acessado por:", role);
                    if(role === 'admin'){
                        navigate('/tela_admin');
                    }else if(role ==='org'){
                        navigate('/tela_organizador');
                    }
                    
                    else{
                        navigate(`/evento/inscricoes/${id}/pagamentos`);
                    }
                }, 2100); 
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            console.error("Erro no registro:", error.message);
            toast.error("Falha ao criar a conta. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleRegister}> 
                        <h3 className={styles.titulo_login}>Criar conta</h3>
                        <div className={styles.text_label}>
                            <input 
                                type='text' 
                                id="nome" 
                                name='nome' 
                                placeholder='Digite o seu nome e sobrenome' 
                                required 
                                onChange={e => setName(e.target.value)}
                                disabled={loading}
                            />
                        </div>
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
                    </form>                         
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default CriarConta;