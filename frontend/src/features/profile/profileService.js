import axios from 'axios';


const API_URL = '/api/profiles/';


// Get profile
const getProfile = async (username, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(`${API_URL}${username}`, config);

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

    if (res.data) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.profile = res.data;

        localStorage.setItem('user', JSON.stringify(user));
    }

    return res.data;
}


// Connect wallet
const connectWallet = async (wallet, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.post(`${API_URL}connectWallet`, { wallet }, config);

    if (res.data) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.profile = res.data;

        localStorage.setItem('user', JSON.stringify(user));
    }

    return res.data;
}


const profileService = {
    getProfile,
    updateProfile,
    connectWallet,
}

export default profileService;