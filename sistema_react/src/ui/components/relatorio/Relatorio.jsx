import { fetchAllSubscribers } from '../../../utils/rotaInscrito/RotaInscrito';
import { fecthIdEvent } from '../../../utils/rotaEvento/RotaEvento';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/Relatorio.module.css';

Chart.register(ArcElement, Tooltip, Legend);

const Relatorio = () => {
    const [eventos, setEventos] = useState([]);
    const [inscritos, setInscritos] = useState([]);
    const [dadosGrafico, setDadosGrafico] = useState(null);
    const [totalArrecadado, setTotalArrecadado] = useState(0);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const inscritosData = await fetchAllSubscribers();
                setInscritos(inscritosData);
                const agrupadosPorEvento = inscritosData.reduce((acc, inscrito) => {
                    if (!acc[inscrito.event_id]) {
                        acc[inscrito.event_id] = [];
                    }
                    acc[inscrito.event_id].push(inscrito);
                    return acc;
                }, {});

                const eventosData = await Promise.all(
                    Object.keys(agrupadosPorEvento).map(async (eventId) => {
                        const evento = await fecthIdEvent(eventId);
                        const inscritosCount = agrupadosPorEvento[eventId].length;
                        return {
                            ...evento,
                            inscritos: inscritosCount,
                            arrecadado: evento.price * inscritosCount
                        };
                    })
                );

                setEventos(eventosData);
                const total = eventosData.reduce((total, evento) => total + evento.arrecadado, 0);
                setTotalArrecadado(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

                const dados = {
                    labels: eventosData.map(evento => evento.title),
                    datasets: [
                        {
                            label: 'Valor Arrecadado por Evento',
                            data: eventosData.map(evento => evento.arrecadado),
                            backgroundColor: ['#d95872', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] // Cores para cada setor
                        }
                    ]
                };
                setDadosGrafico(dados);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchDados();
    }, []);
    
    return (
        <div className={styles.container_grafico}>
            {dadosGrafico && (
                <div className={styles.grafico}>
                    <h2>Gráfico de Arrecadação por Evento</h2>
                    <Pie data={dadosGrafico} />
                </div>
            )}
            <div className={styles.total}>
                <h4>Total Geral: {totalArrecadado}</h4>
            </div>
        </div>
    );
};

export default Relatorio;