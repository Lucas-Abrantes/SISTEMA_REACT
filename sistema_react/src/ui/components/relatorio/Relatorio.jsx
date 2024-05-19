import { fetchAllSubscribers } from '../../../utils/rotaInscrito/RotaInscrito';
import { fecthIdEvent } from '../../../utils/rotaEvento/RotaEvento';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/Relatorio.module.css';

// Register the required elements with Chart.js
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

                const eventosData = await Promise.all(
                    inscritosData.map(async (inscrito) => {
                        const evento = await fecthIdEvent(inscrito.event_id);
                        return { ...evento, inscritos: inscritosData.filter(sub => sub.event_id === evento.id).length };
                    })
                );

                setEventos(eventosData);

                const total = eventosData.reduce((total, evento) => total + evento.price * evento.inscritos, 0);
                setTotalArrecadado(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

                const dados = {
                    labels: eventosData.map(evento => evento.title),
                    datasets: [
                        {
                            label: 'Valor Arrecadado por Evento',
                            data: eventosData.map(evento => evento.price * evento.inscritos),
                            backgroundColor: ['#79525a', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] // Cores para cada setor
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
                <h4>Total Geral: R$ {totalArrecadado}</h4>
            </div>
        </div>
    );
};

export default Relatorio;
