import { API } from "../api";

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