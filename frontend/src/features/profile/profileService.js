import axios from 'axios';


const API_URL = '/api/profiles/';


// Get profile
const getProfile = async (username) => {
    const res = await axios.get(API_URL + username);

    return res.data;
}


// Update profile
const updateProfile = async (profileData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.put(API_URL, profileData, config);

    return res.data;
}


const profileService = {
    getProfile,
    updateProfile,
}

export default profileService;