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


// Follow profile
const followToggleProfile = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(API_URL + id + '/followToggle', config);

    return res.data;
}


// get many profiles
const getProfiles = async (uId) => {
    const res = await axios.get(`${API_URL}getMany?uId=${uId}`);

    return res.data;
}


const profileService = {
    getProfile,
    updateProfile,
    followToggleProfile,
    getProfiles,
}

export default profileService;