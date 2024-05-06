import React, { useEffect, useState } from 'react';
import { fetchAllPayments, deletePayment } from '../../../utils/api';
import TabelaGenerica from '../tabela_generica/TabelaGenerica'; // Certifique-se de que o caminho está correto

function TabelaPagamento() {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        async function loadPayments() {
            try {
                const fetchedPayments = await fetchAllPayments();
                setPayments(fetchedPayments);
            } catch (error) {
                console.error('Failed to fetch payments:', error);
            }
        }
        loadPayments();
    }, []);

    const handleDeletePayment = async (id) => {
        try {
            await deletePayment(id);
            const updatedPayments = payments.filter(payment => payment.id !== id);
            setPayments(updatedPayments);
            alert('Pagamento excluído com sucesso!');
        } catch (error) {
            alert('Falha ao excluir pagamento. Tente novamente.');
        }
    };

    const paymentColumns = [
        { key: 'id', title: 'ID' },
        { key: 'value', title: 'Valor' },
        { key: 'payment_method', title: 'Método de Pagamento' },
        { key: 'status', title: 'Status' }
    ];

    return (
        <TabelaGenerica
            data={payments}
            columns={paymentColumns}
            onDelete={handleDeletePayment}
            onEdit={(id) => alert(`Editar ${id}`)} 
        />
    );
}

export default TabelaPagamento;