import axios from 'axios';


const API_URL = '/api/users/';


// Get user
export const getUser = async (username, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}${username}`, config);
    
    return response.data;
};


// Register user
export const registerUser = async (user) => {
    const response = await axios.post(API_URL + 'register', user);

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


const authService = {
    getUser,
    registerUser,
    logout,
    login,
    updateUser
};

export default authService;