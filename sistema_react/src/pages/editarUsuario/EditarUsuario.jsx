import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdUser, updateUser } from '../../utils/api'; 

function EditarUsuario() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [typeUserId, setTypeUserId] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await fecthIdUser(id);
                setName(user.name);
                setEmail(user.email);
                setTypeUserId(user.type_user_id);
            } catch (error) {
                toast.error('Erro ao buscar detalhes do usuário.');
            }
        };

        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser({
                id,
                name,
                email,
                type_user_id: typeUserId
            });

            if (response.success) {
                toast.success('Usuário atualizado com sucesso');
                setTimeout(() => navigate('/'), 2500); // Redireciona após a atualização
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Erro na atualização:", error.message);
            toast.error("Falha ao atualizar o usuário. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleUpdate}>
                        <h3 className={styles.titulo_login}>Atualizar Usuário</h3>
                        <div className={styles.text_label}>
                            <input type='text' id="name" name='name' placeholder='Nome' required 
                                value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='email' id="email" name='email' placeholder='E-mail' required
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="type_user_id" name='type_user_id' placeholder='ID do Tipo de Usuário' required 
                                value={typeUserId} onChange={e => setTypeUserId(e.target.value)}
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

export default EditarUsuario;