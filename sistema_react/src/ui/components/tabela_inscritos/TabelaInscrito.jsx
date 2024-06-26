import React, { useEffect, useState } from 'react';
import { fetchAllSubscribers, deleteSubscriber } from '../../../utils/rotaInscrito/RotaInscrito';
import TabelaGenerica from '../tabela_generica/TabelaGenerica';
import TabelaGenericaUser from '../tabelaGenericaUser/TabelaGenericaUser';
import 'react-toastify/dist/ReactToastify.css';

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
        } catch (error) {
            console.log(error);
        }
    };

    function formatStatus(value) {
        return value ? "Inscrito" : "Em aberto";
    }

    const subscriberColumns = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
        { key: 'telefone', title: 'Telefone' },
        { key: 'event_id', title: 'Event' }, 
        { key: 'subscribe_date', title: 'Data', formatter: (value) => value.slice(0, 10) },   
        { key: 'status', title: 'Status', formatter: formatStatus }
    ];

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role; 

    console.log(role);

    return (
        <>
        {role === 'admin' || role === 'org' ? (
                <TabelaGenerica
                data={subscribers}
                columns={subscriberColumns}
                onDelete={handleDeleteSubscriber}
                routeCurrent='subscribers'
                editRoute='editar_inscritos'
                createRoute='criar_inscrito'
                searchField='name'
            />
        ): (
            <TabelaGenericaUser
            data={subscribers}
            columns={subscriberColumns}
            onDelete={handleDeleteSubscriber}
            routeCurrent='subscribers'
            editRoute='editar_inscritos'
            createRoute='criar_inscrito'
            tableType='subscribers'
            searchField='name'
          />
        )}
        </>
    );
}

export default TabelaInscritos;