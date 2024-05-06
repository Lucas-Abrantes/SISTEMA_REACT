import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';

const API = axios.create({
    baseURL: baseURL
});

export const login = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password});
        return response.data;
    } catch (error) {
        throw error;
    }
};


//rotas para o usuario

export const register = async ({ name, email, password, typeUserId = 2 }) => {
    try {
        const response = await API.post('/users/store', {
            name,
            email,
            password,
            type_user_id: typeUserId
        });
        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Falha ao registrar usuário." };
        }
    } catch (error) {
        console.error("API call failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao registrar. Tente novamente.', { cause: error });
    }
};



export const deleteUser = async (id) => {
    try {
        const response = await API.delete(`/users/destroy/${id}`);
        if (response.status === 200) {
            console.log('Usuário deletado com sucesso:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao deletar usuário. Tente novamente.', { cause: error });
    }
};


export const fetchAllUsers = async () =>{
    try{
        const response = await API.get('/users/index');
        console.log(response.data);
        return response.data
    }catch(error){
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}


export const fecthIdUser = async (id) =>{
    try{
        const response = await API.get(`/users/show/${id}`);
        console.log(response.data)
        return response.data;
    }catch(error){
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}

//------------------------------------------------------------------------------------------


//rotas para pagamento

export const fetchAllPayments = async () =>{
    try{
        const response = await API.get('/payments/index');
        console.log(response.data);
        return response.data
    }catch(error){
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}



export const deletePayment = async (id) => {
    try {
        const response = await API.delete(`/payments/destroy/${id}`);
        if (response.status === 200) {
            console.log('Pagamento deletado com sucesso:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao deletar usuário. Tente novamente.', { cause: error });
    }
};
//------------------------------------------------------------------------------------------


// rotas de eventos
export const fetchAllEvents = async () =>{
    try{
        const response = await API.get('/events/index');
        console.log(response.data);
        return response.data
    }catch(error){
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}


export const deleteEvent = async (id) => {
    try {
        const response = await API.delete(`/events/destroy/${id}`);
        if (response.status === 200) {
            console.log('Evento deletado com sucesso:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao deletar usuário. Tente novamente.', { cause: error });
    }
};

//------------------------------------------------------------------------------------------



//rota de inscritos
export const fetchAllSubscribers = async () =>{
    try{
        const response = await API.get('/subscribers/index');
        console.log(response.data);
        return response.data
    }catch(error){
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter inscrito. Tente novamente.', { cause: error });
    }
}


export const deleteSubscriber = async (id) => {
    try {
        const response = await API.delete(`/subscribers/destroy/${id}`);
        if (response.status === 200) {
            console.log('Inscrito deletado com sucesso:', response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao deletar usuário. Tente novamente.', { cause: error });
    }
};
//------------------------------------------------------------------------------------------