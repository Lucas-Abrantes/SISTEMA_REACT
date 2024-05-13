import React, { useState, useEffect } from 'react';
import styles from '../../styles/Tabelas.module.css';
import { useNavigate } from 'react-router-dom';

function TabelaGenericaUser({ data, columns, onDelete, onEdit, routeCurrent, editRoute, createRoute, tableType }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);  // Configura inicialmente 5 itens por página

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const renderActionButton = (item) => {
        switch (tableType) {
            case 'events':
                return <button onClick={handleCreate} className={styles.btnEditar}>Inscrever</button>;
            case 'payments':
                return <button onClick={() => onEdit(item.id)} className={styles.btnEditar}>Efetuar Pagamento</button>;
            case 'subscribers':
                return <button onClick={() => onDelete(item.id)} className={styles.btnExcluir}>Excluir Inscrição</button>;
            default:
                return null;
        }
    };
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setCurrentPage(1); 
        if (value) {
            const filtered = data.filter(item => item.id.toString().includes(value));
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    const handleCreate = () => {
        if (createRoute) {
            navigate(`/tela_usuario/${routeCurrent}/${createRoute}`);
        } else {
            console.error("Create route is undefined");
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

    return (
        <>
            <div className={styles.content}>
                <div className={styles.pesquisa}>
                    <div className={styles.pesquisa_user}>
                        <input
                            type='text'
                            placeholder='Search by ID'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className={styles.controls}>
                    <label  className={styles.labelSelect}>
                        Items por página:
                        <select className={styles.selectInput}  value={itemsPerPage} onChange={handleItemsPerPageChange}>
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
                                            {renderActionButton(item)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pagination}>
                    <button className={styles.pages}  onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                    <button className={styles.pages} onClick={() => paginate(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredData.length}>Next</button>
                </div>
            </div>
        </>
    );
}

export default TabelaGenericaUser;