import { createContext, useContext, useLayoutEffect, useState } from "react";
import axios from "axios";
import { node } from "prop-types";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            if (accessToken) {
                console.log("Access Token found", accessToken);
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        return () => api.interceptors.request.eject(authInterceptor);
    }, [accessToken]);

    useLayoutEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (
                    error.response?.status === 403 &&
                    !originalRequest._retry &&
                    !originalRequest.url.endsWith("/users/refresh")
                ) {
                    originalRequest._retry = true;
                    try {
                        const res = await api.post("/users/refresh", {});
                        setAccessToken(res.data.accessToken);
                        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                        return api(originalRequest);
                    } catch (error) {
                        setAccessToken(null);
                        window.location.href = "/login";
                        throw new Error(error.response?.data?.message || "Please Login again");
                    }
                }
                if (
                    (error.response?.status === 401 || error.response?.status === 403) &&
                    originalRequest.url.endsWith("/users/refresh")
                ) {
                    setAccessToken(null);
                    window.location.href = "/login";
                    throw new Error(error.response?.data?.message || "Please Login again");
                }
                return Promise.reject(error);
            }
        );
        return () => api.interceptors.response.eject(responseInterceptor);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

AuthProvider.propTypes = {
    children: node.isRequired,
};