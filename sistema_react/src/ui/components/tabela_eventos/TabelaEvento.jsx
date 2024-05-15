import React, { useEffect, useState } from 'react';
import TabelaGenerica from '../tabela_generica/TabelaGenerica';
import { fetchAllEvents, deleteEvent } from '../../../utils/rotaEvento/RotaEvento';

function TabelaEventos() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            try {
                const fetchedEvents = await fetchAllEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        }
        loadEvents();
    }, []);

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            const updatedEvents = events.filter(event => event.id !== id);
            setEvents(updatedEvents);
            alert('Evento excluído com sucesso!');
        } catch (error) {
            alert('Falha ao excluir evento. Tente novamente.');
        }
    };

    const eventColumns = [
        { key: 'id', title: 'ID' },
        { key: 'title', title: 'Title' },
        { key: 'description', title: 'Description' },
        { key: 'data', title: 'Data' , formatter: (value) => value.slice(0, 10)},
        { key: 'location', title: 'Location' },
        { key: 'organizador', title: 'Organizador' },
        { key: 'capacity', title: 'Capacity' },
        { key: 'price', title: 'Price', formatter: (value) => {
            const numberValue = Number(value);
            return isNaN(numberValue) ? 'Valor inválido' : `R$ ${numberValue.toFixed(2)}`;
        }}
    ];

    

    return (
        <>
        {<TabelaGenerica
            data={events}
            columns={eventColumns}
            onDelete={handleDeleteEvent}
            onEdit={(id) => alert(`Editar evento ${id}`)} 
            routeCurrent='events'
            editRoute='editar_evento'
            createRoute='criar_evento'
            searchField='title'
        />
        }
        </>
     
    );
}

export default TabelaEventos;