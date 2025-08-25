// src/hooks/useAuth.js
import { useEffect, useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        setTimeout(() => {
            setLoading(false);
        }, 800); // Simulate delay
    }, []);

    return { user, loading };
};

export default useAuth;