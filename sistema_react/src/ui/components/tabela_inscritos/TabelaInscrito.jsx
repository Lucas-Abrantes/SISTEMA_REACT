import React, { useEffect, useState } from 'react';
import { fetchAllSubscribers, deleteSubscriber } from '../../../utils/api';
import TabelaGenerica from '../tabela_generica/TabelaGenerica';

function TabelaInscritos() {
    const [subscribers, setSubscribers] = useState([]);
    useEffect(() => {
        async function loadSubscribers() {
            try {
                const fetchedSubscribers = await fetchAllSubscribers();
                setSubscribers(fetchedSubscribers);
            } catch (error) {
                console.error('Failed to fetch subscribers:', error);
            }
        }
        loadSubscribers();
    }, []);

    const handleDeleteSubscriber = async (id) => {
        try {
            await deleteSubscriber(id);
            const updatedSubscribers = subscribers.filter(subscriber => subscriber.id !== id);
            setSubscribers(updatedSubscribers);
            alert('Inscrito excluído com sucesso!');
        } catch (error) {
            alert('Falha ao excluir inscrito. Tente novamente.');
        }
    };


    function formatStatus(value) {
        return value ? "Ativo" : "Inativo";
    }


    const subscriberColumns = [
        { key: 'id', title: 'ID' },
        { key: 'user_id', title: 'Usuário' },
        { key: 'event_id', title: 'Event' }, 
        { key: 'subscribe_date', title: 'Data' },   
        { key: 'status', title: 'Status', formatter: formatStatus }
    ];

    return (
        <TabelaGenerica
            data={subscribers}
            columns={subscriberColumns}
            onDelete={handleDeleteSubscriber}
            onEdit={(id) => alert(`Editar ${id}`)} 
        />
    );
}

export default TabelaInscritos;