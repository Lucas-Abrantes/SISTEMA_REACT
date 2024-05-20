import { API } from "../api";

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
            return { success: false, message: "Falha ao registrar inscrito." };
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
        console.log("API call to fetch all subscribers failed:", error.response ? error.response.data : "No response data");
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
        console.error("Erro ao deletar inscrito:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao deletar inscrito. Tente novamente.', { cause: error });
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
        console.error("API call to subscribe failed:", error.response ? error.response.data : "No response data");
        throw new Error('Failed to subscribe. Please try again.', { cause: error });
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