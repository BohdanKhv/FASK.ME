import axios from 'axios';


const API_URL = '/api/follow/';


// get followers
const getFollowers = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token ? token : ''}`,
        }
    };
    const res = await axios.get(`${API_URL}followers/${data.id}?limit=${data.limit}&skip=${data.skip}`, config);

    return res.data;
}


// get following
const getFollowing = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token ? token : ''}`,
        }
    };
    const res = await axios.get(`${API_URL}following/${data.id}?limit=${data.limit}&skip=${data.skip}`, config);

    return res.data;
}


// follow user
const followUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.post(`${API_URL}${id}`, null, config);

    return res.data;
}



const followService = {
    getFollowers,
    getFollowing,
    followUser,
};

export default followService;