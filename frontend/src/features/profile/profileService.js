import axios from 'axios';


const API_URL = '/api/profiles/';


// Get profile
const getProfile = async (data, token) => {
    const res = await axios.get(`${API_URL}${data.username}${data.uId ? '?uId='+data.uId: ''}`);

    return res.data;
}


// Update profile
const updateProfile = async (profileData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.put(API_URL, profileData, config);

    return res.data;
}


// get many profiles
const getProfiles = async (q) => {
    const res = await axios.get(`${API_URL}getMany?${q}`);

    return res.data;
}


const profileService = {
    getProfile,
    updateProfile,
    getProfiles,
}

export default profileService;