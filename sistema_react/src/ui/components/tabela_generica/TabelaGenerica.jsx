import React, { useState, useEffect } from 'react';
import styles from '../../styles/Tabelas.module.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TabelaGenerica({ data, columns, onDelete, onEdit, routeCurrent, editRoute, createRoute, searchField }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.role;

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handleEdit = (id) => {
        if (role === 'admin'){
            navigate(`/tela_admin/${routeCurrent}/${editRoute}/${id}`);
        }else{
            navigate(`/tela_organizador/${routeCurrent}/${editRoute}/${id}`);
        }
        
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setCurrentPage(1);
        if (value) {
            const filtered = data.filter(item => item[searchField]?.toString().toLowerCase().includes(value.toLowerCase()));
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    const handleCreate = () => {
        if (role === 'admin') {
            navigate(`/tela_admin/${routeCurrent}/${createRoute}`);
        } else {
            navigate(`/tela_organizador/${routeCurrent}/${createRoute}`);

        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleDelete = async (id) => {
        try {
            await onDelete(id);
            const updatedData = filteredData.filter(item => item.id !== id);
            setFilteredData(updatedData);
            toast.success(`Item excluido com sucesso!`);
        } catch (error) {
            console.error('Erro ao excluir inscrito:', error);
            toast.error('Falha ao excluir. Tente novamente.');
        }
    };

    return (
        <>
            <div className={styles.content}>
                <div className={styles.pesquisa}>
                    <div className={styles.pesquisa_user}>
                        <input
                            type='text'
                            placeholder={`Search by ${searchField}`}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className={styles.add}>
                        <button className={styles.new} onClick={handleCreate}>Add +</button>
                    </div>
                </div>
                <div className={styles.controls}>
                    <label className={styles.labelSelect}>
                        Items per page:
                        <select className={styles.selectInput} value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </label>
                </div>
                <div className={styles.tabela}>
                    <table>
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key}>{column.title}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    {columns.map((column) => (
                                        <td key={`${item.id}-${column.key}`}>
                                            {column.formatter ? column.formatter(item[column.key]) : item[column.key]}
                                        </td>
                                    ))}
                                    <td>
                                        <div className={styles.botoes}>
                                            <button onClick={() => handleEdit(item.id)} className={styles.btnEditar}>Editar</button>
                                            <button onClick={() => handleDelete(item.id)} className={styles.btnExcluir}>Excluir</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pagination}>
                    <button className={styles.pages} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                    <button className={styles.pages} onClick={() => paginate(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredData.length}>Next</button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default TabelaGenerica;
