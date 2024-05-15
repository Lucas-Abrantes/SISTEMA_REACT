import { API } from "./api";

export const login = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};
