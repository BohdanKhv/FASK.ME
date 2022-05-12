import axios from "axios";


const API_URL = "/api/questions";


// get received questions
const getReceivedQuestions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/received`, config);

    return res.data;
}


// get sent questions
const getSentQuestions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/sent`, config);

    return res.data;
}


// get pinned questions
const getProfileFaqQuestions = async (username) => {
    const res = await axios.get(`${API_URL}/user/${username}/faq`);

    return res.data;
}


// get answered questions
const getProfileAnsweredQuestions = async (username) => {
    const res = await axios.get(`${API_URL}/user/${username}/answered`);

    return res.data;
}


// get profile asked questions
const getProfileAskedQuestions = async (username) => {
    const res = await axios.get(`${API_URL}/user/${username}/asked`);

    return res.data;
}


// Create a question
const createQuestion = async (question, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.post(`${API_URL}`, question, config);

    return res.data;
}


// Update a question
const updateQuestion = async (question, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.put(`${API_URL}/${question._id}`, question, config);

    return res.data;
}


// Delete a question
const deleteQuestion = async (questionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.delete(`${API_URL}/${questionId}`, config);

    return res.data;
}



const questionService = {
    getReceivedQuestions,
    getSentQuestions,
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
}

export default questionService;