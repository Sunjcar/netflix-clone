import axios from "axios";
import { BASE_URL } from "./tmdbAPI";

import { Show, User } from "./types";

interface userAccess {
    username: string;
    password: string;
}

let token: string;

const createUser = async (newUser: userAccess): Promise<User> => {
    const res = await axios.post(BASE_URL, newUser);
    console.log(res)
    return res.data;
};

const checkUser = async (username: string): Promise<boolean> => {
    const res = await axios.post(`${BASE_URL}/check`, { username });
    console.log(res.data)
    return res.data;
};

const setToken = (newToken: string) => {
    token = `tok ${newToken}`;
};

const toggleList = async (input: Show): Promise<{ newList: Show[]; }> => {
    const config = {
        headers: { Authorization: token }
    };

    const res = await axios.put(BASE_URL, { showToToggle: input }, config);
    console.log(res)
    return res.data;
};




interface Credentials {
    username: string;
    password: string;
}

const login = async (credentials: Credentials): Promise<User> => {
    const response = await axios.post<User>(BASE_URL, credentials);
    console.log(response)
    console.log(response.data);
    return (response.data);
};

export const userService = {
    createUser,
    checkUser,
    setToken,
    toggleList,
    login,
};
