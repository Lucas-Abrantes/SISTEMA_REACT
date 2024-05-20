import { API } from "../api";

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
            return { success: false, message: "Falha ao registrar evento." };
        }
    } catch (error) {
        console.error("API call failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao registrar. Tente novamente.', { cause: error });
    }
};


export const fetchAllEvents = async () => {
    try {
        const response = await API.get('/events/index');
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log("API call to fetch all users failed:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao obter evento. Tente novamente.', { cause: error });
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
        console.error("Erro ao deletar evento:", error.response ? error.response.data : "No response data");
        throw new Error('Falha ao deletar evento. Tente novamente.', { cause: error });
    }
};


export const fecthIdEvent = async (id) => {
    try {
        const response = await API.get(`/events/show/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Falha ao obter evento. Tente novamente.', { cause: error });
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