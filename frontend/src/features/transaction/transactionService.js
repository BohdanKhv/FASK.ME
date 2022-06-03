import axios from "axios";


const API_URL = "/api/transactions/";


// Create a transaction
const createTransaction = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.post(API_URL, data, config);

    return res.data;
};


// Get transactions
const getTransactions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}?limit=${data.limit}&skip=${data.skip}`, config);

    return res.data;
};



const transactionService = {
    createTransaction,
    getTransactions
};

export default transactionService;