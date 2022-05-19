import axios from 'axios';


const API_URL = '/api/follow/';


// get followers
const getFollowers = async (username) => {
    const res = await axios.get(`${API_URL}followers/${username}`);

    return res.data;
}


// get following
const getFollowing = async (username) => {
    const res = await axios.get(`${API_URL}following/${username}`);

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


// unfollow user
const unfollowUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const res = await axios.delete(`${API_URL}${id}`, config);

    return res.data;
}



const followService = {
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
};

export default followService;