import React from 'react';
import styles from '../../ui/styles/NotPage.module.css';

function NotPage() {
    return (
      <>
        <div className={styles.pageError}>
          <div className={styles.notPage}>
            <h1>404 - Página Não Encontrada</h1>
            <p>Desculpe, mas o caminho não existe.</p>
          </div>
        </div>
      </>
    );
}

export default NotPage;