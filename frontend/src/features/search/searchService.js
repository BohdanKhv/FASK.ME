import axios from "axios";


const API_URL = "/api/profiles/";


// get many profiles
const searchUsers = async (q) => {
    const res = await axios.get(`${API_URL}getMany?${q}`);

    return res.data;
}



const profileService = {
    searchUsers,
};

export default profileService;