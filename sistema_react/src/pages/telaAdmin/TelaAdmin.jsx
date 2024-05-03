import React from 'react';
import NavBar from '../../ui/components/navegacao/NavBar';
import Footer from '../../ui/components/footer/Footer';

function TelaAdmin(){
    return (
        <>
            <NavBar/>
                <div>
                    <div>
                        <h3>admin</h3>
                    </div>
                </div>
            <Footer/>
        </>
    );
}

export default TelaAdmin;