import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import styles from '../../ui/styles/Login.module.css';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { fecthIdEvent, updateEvent } from '../../utils/rotaEvento/RotaEvento'; 

function EditarEvento() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState('');
    const [location, setLocation] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const event = await fecthIdEvent(id);
                setTitle(event.title);
                setDescription(event.description);
                setData(event.data.slice(0,10));
                setLocation(event.location);
                setOrganizador(event.organizador);
                setCapacity(event.capacity);
                setPrice(event.price);
            } catch (error) {
                toast.error('Erro ao buscar detalhes do evento.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;
            const role = user && user.role;
            const response = await updateEvent({
                id,
                title,
                description,
                data,
                location,
                organizador,
                capacity: Number(capacity),
                price: parseFloat(price)
            });

            if (response.success) {
                toast.success('Evento atualizada com sucesso',{
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
            toast.error("Falha ao atualizar o evento. Por favor, tente novamente.");
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
                        <h3 className={styles.titulo_login}>Atualizar Evento</h3>
                        {loading ? (
                            <div className={styles.loaderContainer}>
                                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                            </div>
                        ) : (
                            <>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="title" 
                                        name='title' 
                                        placeholder='Título do Evento' 
                                        required 
                                        value={title} 
                                        onChange={e => setTitle(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="description" 
                                        name='description' 
                                        placeholder='Descrição' 
                                        required
                                        value={description} 
                                        onChange={e => setDescription(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="date" 
                                        name='date' 
                                        placeholder='Data' 
                                        required 
                                        value={data} 
                                        onChange={e => setData(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='text' 
                                        id="location" 
                                        name='location' 
                                        placeholder='Localização' 
                                        required 
                                        value={location} 
                                        onChange={e => setLocation(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                <select 
                                    className={styles.select_input}
                                    id="organizer"
                                    name="organizer"
                                    value={organizador}
                                    onChange={e => setOrganizador(e.target.value)}

                                    disabled={loading}
                                >
                                    <option value="">Selecione o tipo de organizador</option>
                                    <option value="1">Admin</option>
                                    <option value="3">Organizador</option>
                                </select>
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='number' 
                                        id="capacity" 
                                        name='capacity' 
                                        placeholder='Capacidade' 
                                        required 
                                        value={capacity} 
                                        onChange={e => setCapacity(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={styles.text_label}>
                                    <input 
                                        type='number' 
                                        id="price" 
                                        name='price' 
                                        placeholder='Preço' 
                                        required 
                                        value={price} 
                                        onChange={e => setPrice(e.target.value)}
                                        disabled={loading}
                                    />
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

export default EditarEvento;