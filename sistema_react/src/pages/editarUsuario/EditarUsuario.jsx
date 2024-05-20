import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdUser, updateUser } from '../../utils/rotaUusario/RotaUsuario'; 

function EditarUsuario() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [typeUserId, setTypeUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await fecthIdUser(id);
                setName(user.name);
                setEmail(user.email);
                setTypeUserId(user.type_user_id);
            } catch (error) {
                toast.error('Erro ao buscar detalhes do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;
            const role = user && user.role;
            const response = await updateUser({
                id,
                name,
                email,
                type_user_id: typeUserId
            });

            if (response.success) {
                toast.success('Usuario atualizada com sucesso',{
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
            toast.error("Falha ao atualizar o usuário. Por favor, tente novamente.");
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
                        <h3 className={styles.titulo_login}>Atualizar Usuário</h3>
                        {loading ? (
                            <div className={styles.loaderContainer}>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                        ) : (
                            <>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="name" 
                                        name='name' 
                                        placeholder='Nome' 
                                        required 
                                        value={name} 
                                        onChange={e => setName(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='email' 
                                        id="email" 
                                        name='email' 
                                        placeholder='E-mail' 
                                        required
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <select
                                        className={styles.select_input}
                                        type='text' 
                                        id="type_user_id" 
                                        name='type_user_id' 
                                        placeholder='ID do Tipo de Usuário' 
                                        required 
                                        value={typeUserId} 
                                        onChange={e => setTypeUserId(e.target.value)}
                                        disabled={loading}
                                    >
                                        <option value="">Selecione o tipo de organizador</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Cliente</option>
                                        <option value="3">Organizador</option>
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

export default EditarUsuario;