import { API } from "../api";

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
}