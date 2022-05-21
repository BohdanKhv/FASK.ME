import axios from "axios";


const API_URL = "/api/questions";


// get received questions
const getReceivedQuestions = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.get(`${API_URL}/received?${data.limit}&${data.skip}`, config);

    return res.data;
}


const inboxService = {
    getReceivedQuestions,
};
export default inboxService;