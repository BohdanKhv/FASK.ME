import axios from "axios";


const API_URL = "/api/questions";


// get sent questions
const getSentQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/sent?${data.limit}&${data.skip}`, config);

    return res.data;
}


// get pinned questions
const getProfileFaqQuestions = async (data) => {
    const res = await axios.get(`${API_URL}/user/${data.username}/faq?${data.limit}&${data.skip}`);

    return res.data;
}


// get answered questions
const getProfileAnsweredQuestions = async (data) => {
    const res = await axios.get(`${API_URL}/user/${data.username}/answered?${data.limit}&${data.skip}`);

    return res.data;
}


// get profile asked questions
const getProfileAskedQuestions = async (data) => {
    const res = await axios.get(`${API_URL}/user/${data.username}/asked?${data.limit}&${data.skip}`);

    return res.data;
}


// get user private questions
const getUserPrivateQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/private?${data.limit}&${data.skip}`, config);

    return res.data;
}


// get followers questions
const getFollowersQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/followers?${data.limit}&${data.skip}`, config);

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
    getSentQuestions,
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    getUserPrivateQuestions,
    getFollowersQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
}

export default questionService;