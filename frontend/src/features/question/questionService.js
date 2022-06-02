import axios from "axios";


const API_URL = "/api/questions";


// get sent questions
const getSentQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/sent?limit=${data.limit}&skip=${data.skip}`, config);

    return res.data;
}


// get faq questions
const getProfileFaqQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token || ""}`
        }
    };
    const res = await axios.get(`${API_URL}/user/${data.username}/faq?limit=${data.limit}&skip=${data.skip}`, config);

    return res.data;
}


// get answered questions
const getProfileAnsweredQuestions = async (data) => {
    const res = await axios.get(`${API_URL}/user/${data.username}/answered?limit=${data.limit}&skip=${data.skip}`);

    return res.data;
}


// get profile asked questions
const getProfileAskedQuestions = async (data) => {
    const res = await axios.get(`${API_URL}/user/${data.username}/asked?limit=${data.limit}&skip=${data.skip}`);

    return res.data;
}


// get user private questions
const getUserPrivateQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/private?limit=${data.limit}&skip=${data.skip}`, config);

    return res.data;
}


// get followers questions
const getFollowersQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/followers?limit=${data.limit}&skip=${data.skip}`, config);

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


// increment view count
const incrementViewCount = async (questionId) => {
    const res = await axios.post(`${API_URL}/view/${questionId}`);

    return res.data;
}


// pin question
const pinQuestion = async (questionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.post(`${API_URL}/pin/${questionId}`, null, config);

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
    deleteQuestion,
    incrementViewCount,
    pinQuestion
}

export default questionService;