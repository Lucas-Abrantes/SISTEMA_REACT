import React, { useState, useEffect } from 'react';
import styles from '../../styles/Tabelas.module.css';

function TabelaGenericaUser({ data, columns, routeCurrent, editRoute, createRoute, tableType, searchField }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);  

    useEffect(() => {
        setFilteredData(data);
    }, [data]);



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
                            placeholder={`Search by ${searchField}`}
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