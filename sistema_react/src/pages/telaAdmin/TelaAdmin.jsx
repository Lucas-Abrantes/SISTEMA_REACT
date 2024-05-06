import React from 'react';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';
import PainelAdmin from '../../ui/components/painel_admin/PainelAdmin';

function TelaAdmin(){
    return (
        <>
            <NavBar/>
                <PainelAdmin/>
            <Footer/>
        </>
    );
}

export default TelaAdmin;