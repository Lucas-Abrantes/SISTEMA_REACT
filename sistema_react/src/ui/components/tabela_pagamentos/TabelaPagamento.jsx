import React, { useEffect, useState } from 'react';
import { fetchAllPayments, deletePayment } from '../../../utils/api';
import TabelaGenerica from '../tabela_generica/TabelaGenerica';
import TabelaGenericaUser from '../tabelaGenericaUser/TabelaGenericaUser';


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

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user && user.role; 
  console.log(user); // Garante que role seja definido somente se user for não-null
  console.log(role); 

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
   
    <>
    {role === 'admin'? (
      <TabelaGenerica
        data={payments}
        columns={paymentColumns}
        onDelete={handleDeletePayment}
        editRoute='editar_pagamento'
        routeCurrent='payments'
        createRoute='criar_pagamento'
      />
    ) : (
      <TabelaGenericaUser
        data={payments}
        columns={paymentColumns}
        onDelete={handleDeletePayment}
        editRoute='editar_pagamento'
        routeCurrent='payments'
        createRoute='criar_pagamento'
        tableType={'payments'}
      />
    )}
  </>

  );
}

export default TabelaPagamento;