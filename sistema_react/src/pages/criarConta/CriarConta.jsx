import React from 'react';
import styles from '../../ui/styles/Login.module.css'
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';

function Login(){
    return (
        <>
            <NavBar/>
            <div className={styles.page}>
                        <div className={styles.login}>
                            <form> 
                            <h3 className={styles.titulo_login}>Crie a sua conta.</h3>   
                            <div className={styles.text_label}>
                                <input type='text' id="nome" name='nome' placeholder='Digite o seu nome e sobrenome' required ></input>
                            </div>               
                            <div className={styles.text_label}>
                                <input type='email' id="email" name='email' placeholder='Digite o seu e-mail' required ></input>
                            </div>
                            <div className={styles.text_label}>
                                <input type='password' id="senha" name='senha' placeholder='Digite a senha' required ></input>
                            </div>
                            <button className={styles.btn} type='submit' value="enviar" >Enviar</button>
                            <a className={styles.conta_user} href='#'>Já tenho uma conta.</a>
                            </form>                         
                        </div>
                    </div>        
            <Footer/>
        </>
    );
}

export default Login;