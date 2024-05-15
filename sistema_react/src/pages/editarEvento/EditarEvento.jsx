import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
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
            }
        };

        fetchEvent();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
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
                toast.success('Evento atualizado com sucesso');
                setTimeout(() => navigate('/'), 2500); 
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Erro na atualização:", error.message);
            toast.error("Falha ao atualizar o evento. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.login}>
                    <form onSubmit={handleUpdate}>
                        <h3 className={styles.titulo_login}>Atualizar Evento</h3>
                        <div className={styles.text_label}>
                            <input type='text' id="title" name='title' placeholder='Título do Evento' required 
                                value={title} onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="description" name='description' placeholder='Descrição' required
                                value={description} onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="date" name='date' placeholder='Data' required 
                                value={data} onChange={e => setData(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="location" name='location' placeholder='Localização' required 
                                value={location} onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='text' id="organizer" name='organizer' placeholder='Organizador' required 
                                value={organizador} onChange={e => setOrganizador(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='number' id="capacity" name='capacity' placeholder='Capacidade' required 
                                value={capacity} onChange={e => setCapacity(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_label}>
                            <input type='number' id="price" name='price' placeholder='Preço' required 
                                value={price} onChange={e => setPrice(e.target.value)}
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

export default EditarEvento;
