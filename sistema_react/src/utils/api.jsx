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



export const register = async ({ name, email, password, typeUserId = 2 }) => {
    try {
        const response = await API.post('/store', {
            name,
            email,
            password,
            type_user_id: typeUserId  // Usa o valor padrão de 2 se nenhum outro for fornecido
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
