// src/hooks/useBrands.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBrands = async({ queryKey }) => {
    const [_key, access_token] = queryKey;
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/brand-info/`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const useBrands = (access_token) => {
    return useQuery({
        queryKey: ['brands', access_token], // ✅ include token in key
        queryFn: fetchBrands,
        enabled: !!access_token, // ✅ only run when token is available
    });
};