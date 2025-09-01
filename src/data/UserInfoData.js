// src/hooks/useBrands.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async({ queryKey }) => {
    const [_key, access_token] = queryKey;
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/customuser/`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const UserInfoData = (access_token) => {
    return useQuery({
        queryKey: ['user', access_token], // ✅ include token in key
        queryFn: fetchUsers,
        enabled: !!access_token, // ✅ only run when token is available
    });
};