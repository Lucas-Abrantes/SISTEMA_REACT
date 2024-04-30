import React from 'react';
import styles from '../../styles/Footer.module.css';
import FacebookImg from '../../../assets/img/facebook.svg';
import LinkedinImg from '../../../assets/img/linkedin.svg';
import InstagramImg from '../../../assets/img/insta.svg';


function Footer(){
    return(
        <>
        <div className={styles.rodape}>
            <div className={styles.empresa}>
                <h4>Group Events</h4>
                <ul className={styles.itens_empresa}>
                    <li><a href='#id'>Sobre nós</a></li>
                    <li><a href='#id'>Contatos</a></li>
                    <li><a href='#id'>Como chegar</a></li>
                    <li><a href='#id'>Termos de uso</a></li>
                </ul>
            </div>

            <div className={styles.empresa_contato}>
                <h4>Precisa de ajuda?</h4>
                <ul className={styles.contatos}>
                    <li>
                        <strong>Telefone para contato:</strong>
                        <p>(84) 99008888 <a href='#id'>(WhatsApp)</a></p>
                    </li>
                    <li>
                        <strong>E-mail para contato:<br/></strong>
                        <a href='#email'>event_group@hotmail.com</a>
                    </li>
                    <li>
                        <a href='#'>Dúvidas frequentes</a>
                    </li>
                </ul>
            </div>
            
            <div className={styles.aplicativos}>
                <h4>Baixe nosso app</h4>
                <div>
                    <a href='#apple'>Apple Store</a>
                    <a href='#playstore'>Play Store</a>
                </div>
            </div>
        </div>
        
        <div className={styles.adicionais}>
            <div className={styles.info}>
                <div className={styles.footer_group}>
                    <p>Copyright © 2024 Group Events - CNPJ: 20.150.999/0001-35</p>
                    <div className={styles.footer_midias}>
                        <a className={styles.redes} href='#'><img src={FacebookImg} alt='facebook'/></a>
                        <a className={styles.redes} href='#'><img src={InstagramImg} alt='instagram'/></a>
                        <a className={styles.redes} href='#'><img  src={LinkedinImg} alt='linkedin'/></a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Footer;