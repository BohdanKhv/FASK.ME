import axios from 'axios';


const API_URL = '/api/users/';


// Register user
export const register = async (user) => {
    const response = await axios.post(API_URL, user);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Set user in localStorage
    }

    return response.data;
};


// Logout
export const logout = async () => {
    localStorage.removeItem('user'); // Remove user from localStorage
}


// Login
export const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Set user in localStorage
    }

    return response.data;
}


// Update user
export const updateUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.put(API_URL, userData, config);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Set user in localStorage
    }

    return response.data;
}


// Follow profile
const followToggleProfile = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get('/api/profiles/' + id + '/followToggle', config);

    if (res.data) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.profile = res.data;

        localStorage.setItem('user', JSON.stringify(user));
    }

    return res.data;
}


const authService = {
    register,
    logout,
    login,
    updateUser,
    followToggleProfile,
};

export default authService;