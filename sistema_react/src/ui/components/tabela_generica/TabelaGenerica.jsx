import React from 'react';
import styles from '../../styles/Tabelas.module.css';

function TabelaGenerica({ data, columns, onDelete, onEdit }) {
    return (
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
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={`${item.id}-${column.key}`}>
                                    {column.formatter ? column.formatter(item[column.key]) : item[column.key]}
                                </td>
                            ))}
                            <td>
                                <div className={styles.botoes}>
                                    <button onClick={() => onEdit(item.id)} className={styles.btnEditar}>Editar</button>
                                    <button onClick={() => onDelete(item.id)} className={styles.btnExcluir}>Excluir</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaGenerica;