import axios from 'axios';

export const getDevices = async(user_id, token) => {
    console.log("Fetching devices for user:", user_id);
    const response = await axios.get(`http://127.0.0.1:8000/devices/?user_id=${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};