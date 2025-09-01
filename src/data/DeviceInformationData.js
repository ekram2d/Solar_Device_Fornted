// src/hooks/useBrands.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDeviceInfo = async({ queryKey }) => {
    const [_key, access_token, brand_info] = queryKey;


    const url =
        `${import.meta.env.VITE_API_BASE_URL}/device-info/brand/${brand_info}`; // fallback to all devices

    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const DeviceInformationData = (access_token, brand_info) => {
    return useQuery({
        queryKey: ["deviceInfo", access_token, brand_info],
        queryFn: fetchDeviceInfo,
        enabled: !!access_token, // only run if logged in
    });
};