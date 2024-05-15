import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';

const API = axios.create({
    baseURL: baseURL
});

export const login = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password });
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


export const fetchAllUsers = async () => {
    try {
        const response = await API.get('/users/index');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}


export const fecthIdUser = async (id) => {
    try {
        const response = await API.get(`/users/show/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}


export const updateUser = async ({ id, name, email, type_user_id }) => {
    try {
        const response = await API.put(`/users/update/${id}`, {
            name,
            email,
            type_user_id
        });

        if (response.status === 200) {
            console.log('User updated successfully:', response.data);
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Failed to update payment." };
        }
    } catch (error) {
        console.error("API call to update user failed:", error.response ? error.response.data : "No response data");
        throw new Error('Failed to update user. Please try again.', { cause: error });
    }
};
//------------------------------------------------------------------------------------------

//rotas para pagamento

export const fetchAllPayments = async () => {
    try {
        const response = await API.get('/payments/index');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}


export const registerPayment = async ({ value, payment_method, statusPayemnt = '1', payment_date }) => {
    try {
        const response = await API.post('/payments/store', {
            value,
            payment_method,
            status: statusPayemnt,
            payment_date
        });
        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Falha ao registrar pagamento." };
        }
    } catch (error) {
        console.error("API call failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao registrar. Tente novamente.', { cause: error });
    }
};


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


export const fecthIdPayment = async (id) => {
    try {
        const response = await API.get(`/payments/show/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}

export const updatePayment = async ({ id, value, payment_method, statusPayment = '1', payment_date }) => {
    try {
        const response = await API.put(`/payments/update/${id}`, {
            value,
            payment_method,
            status: statusPayment,
            payment_date
        });

        if (response.status === 200) {
            console.log('Payment updated successfully:', response.data);
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Failed to update payment." };
        }
    } catch (error) {
        console.error("API call to update payment failed:", error.response ? error.response.data : "No response data");
        throw new Error('Failed to update payment. Please try again.', { cause: error });
    }
};
//------------------------------------------------------------------------------------------


export const registerEvent = async ({ title, description, data, location, organizador, capacity, price }) => {
    try {
        const response = await API.post('/events/store', {
            title,
            description,
            data,
            location,
            organizador,
            capacity,
            price
        });
        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Falha ao registrar pagamento." };
        }
    } catch (error) {
        console.error("API call failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao registrar. Tente novamente.', { cause: error });
    }
};



// rotas de eventos
export const fetchAllEvents = async () => {
    try {
        const response = await API.get('/events/index');
        console.log(response.data);
        return response.data
    } catch (error) {
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


export const fecthIdEvent = async (id) => {
    try {
        const response = await API.get(`/events/show/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Falha ao obter usuários. Tente novamente.', { cause: error });
    }
}


export const updateEvent = async ({ id, title, description, data, location, organizador, capacity, price }) => {
    try {
        const response = await API.put(`/events/update/${id}`, {
            title,
            description,
            data,
            location,
            organizador,
            capacity,
            price
        });

        if (response.status === 200) {
            console.log('Event updated successfully:', response.data);
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Failed to update payment." };
        }
    } catch (error) {
        console.error("API call to update event failed:", error.response ? error.response.data : "No response data");
        throw new Error('Failed to update event. Please try again.', { cause: error });
    }
};

//------------------------------------------------------------------------------------------


//rota de inscritos


 export const updateSubscriptionStatus = async (subscriptionId, status) => {
    try {
        const response = await API.put(`/subscribers/update/${subscriptionId}`, {
            status: status
        });
        return response.data;
    } catch (error) {
        console.error('Falha ao atualizar o status da inscrição:', error);
        throw new Error('Falha ao atualizar. Tente novamente.', { cause: error });
    }
};


export const registerSubscriber = async ({ name, telefone, event_id, subscribe_date, status='0' }) => {
    try {
        const response = await API.post('/subscribers/store', {
            name,
            telefone,
            event_id,
            subscribe_date,
            status: status
        });
        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Falha ao registrar pagamento." };
        }
    } catch (error) {
        console.error("API call failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao registrar. Tente novamente.', { cause: error });
    }
};


export const fetchAllSubscribers = async () => {
    try {
        const response = await API.get('/subscribers/index');
        console.log(response.data);
        return response.data
    } catch (error) {
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


export const updateSubscribe = async ({ id, name,telefone, event_id, subscribe_date, status }) => {
    try {
        const response = await API.put(`/subscribers/update/${id}`, {
            name,
            telefone,
            event_id,
            subscribe_date,
            status
        });

        if (response.status === 200) {
            console.log('Subscribe updated successfully:', response.data);
            return { success: true, data: response.data };
        } else {
            return { success: false, message: "Failed to update payment." };
        }
    } catch (error) {
        console.error("API call to subscribe user failed:", error.response ? error.response.data : "No response data");
        throw new Error('Failed to subscribe user. Please try again.', { cause: error });
    }
};


export const fecthIdSubscribe = async (id) => {
    try {
        const response = await API.get(`/subscribers/show/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Falha ao obter inscrito. Tente novamente.', { cause: error });
    }
}
//------------------------------------------------------------------------------------------