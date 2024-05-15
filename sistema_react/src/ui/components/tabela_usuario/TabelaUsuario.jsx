import React, { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser } from '../../../utils/rotaUusario/RotaUsuario';
import TabelaGenerica from '../tabela_generica/TabelaGenerica'

function TabelaUsuario() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function loadUsers() {
            try {
                const fetchedUsers = await fetchAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }
        loadUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
            alert('Usuário excluído com sucesso!');
        } catch (error) {
            alert('Falha ao excluir usuário. Tente novamente.');
        }
    };

    const userColumns = [
        { key: 'id', title: 'Id' },
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'E-mail' },
        { key: 'type_user_id', title: 'Type' } 
    ]
    
    return (
        <TabelaGenerica
            data={users}
            columns={userColumns}
            onDelete={handleDeleteUser}
            onEdit={(id) => alert(`Editar ${id}`)} 
            routeCurrent='users'
            editRoute='editar_usuario'
            createRoute='criar_conta'
            searchField='name'
        />
    );
}

export default TabelaUsuario;