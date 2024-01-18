import { message } from "antd";
import axios from "axios";
import { API_HOST, FLIGHT_API_KEY } from "../../Constants";

const baseUrl = `${API_HOST}/api`;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                // token: token,
                "X-RapidAPI-Key": "3960c2c87dmshdd12d5ab4d97b72p105be8jsnd2713cb3b78a",
                "X-RapidAPI-Host": "iatacodes-iatacodes-v1.p.rapidapi.com"
                // "Content-Type": `multipart/form-data`
            }
        }
        return config;
    },
    (error) => {
        if (error.response && error.response.status === 400) {
            return axiosInstance.request(error.config);
        }
        return error.response ? error.response : Promise.reject(new Error(error));
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error?.response?.status === 400 || error?.response?.status === 403 || error?.response?.status === 404 || error?.response?.status === 409 || error?.response?.status === 500) {
            // try {
            //   await addException({ 
            //     exception: error?.response?.data?.message,
            //     stackTrace: `at - "${error?.config?.url}" - (${error?.config?.method})`,
            //     errorCode: `${error?.response?.status}`,
            //     innerException: error?.response?.data?.error ? error?.response?.data?.error : error?.response?.data?.message
            //   });
            //   return;
            // } catch (error) {
            //   return message.error('Error in Add Exception' + error);
            // }
        }
        if (error?.response?.data?.isAuth === false) {
            localStorage.clear();

            // await showSessionExpiredMessage();
            // message.error('Session Expired - Please Login Again.');
            // setTimeout(() => {
            //   window.location.href = '/login';
            // }, 1000);
        }
        // if (error.response && error.response.status === 401) {
        //     return axiosInstance.request(error.config);
        // }
        return error.response ? error.response : Promise.reject(new Error(error));
    }
);

export const getUserLogin = async (data) => {
    return await axiosInstance.post(`${baseUrl}/login`, data);
};

export const getAllModulePermissions = async () => {
    return await axiosInstance.get(`${baseUrl}/permission/modulePermission`);
};

export const addUpdateAccessPermissions = async (data) => {
    return await axiosInstance.post(`${baseUrl}/permission/accessPermission`, data);
};

export const getAllAccessPermissionsByUserId = async (userId) => {
    return await axiosInstance.get(`${baseUrl}/permission/accessPermissionByUserId/${userId}`);
};

export const getAllAccessPermissionsByRoleId = async (roleId) => {
    return await axiosInstance.get(`${baseUrl}/permission/accessPermissionByRoleId/${roleId}`);
};

export const changePassword = async (data) => {
    return await axiosInstance.post(`${baseUrl}/login/changePassword`, data);
};


// ------------------------------------- Flights ----------------------------------- 

export const getAirportNames = async () => {
    // let subUrl = `https://api.flightapi.io/iata/${FLIGHT_API_KEY}?name=indian&type=airport&api_key=${FLIGHT_API_KEY}`;
    let subUrl = `https://iatacodes-iatacodes-v1.p.rapidapi.com/api/v9/airports`;
    return await axiosInstance.get(`${subUrl}`);
};
