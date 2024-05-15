import React, { useEffect } from 'react';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PainelUser from '../../ui/components/painel_user/PainelUser';

function TelaUsuario() {
    const user = JSON.parse(localStorage.getItem('user'));
    const showWelcomeMessage = localStorage.getItem('loginSuccess');

    useEffect(() => {

        if (showWelcomeMessage === 'true' && user && user.name) {
            toast.success(`Bem-vindo(a), ${user.name}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            localStorage.removeItem('loginSuccess');
        }
    }, [user]);


    return (
        <>
            <NavBar />
                <PainelUser/>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default TelaUsuario;