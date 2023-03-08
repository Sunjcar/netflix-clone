import axios from "axios";
import { API_KEY, BASE_URL } from "./tmdbAPI";
import { Show, User } from "./types";



interface userRequest {
  username: string;
  password: string;
}

let token: string;

const createUser = async (newUser: userRequest): Promise<User> => {
  const response = await axios.post(`${BASE_URL}${API_KEY}`, newUser);
  return response.data;
};

const checkUser = async (username: string): Promise<boolean> => {
  const response = await axios.post(`${BASE_URL}${API_KEY}/check`, { username });
  return response.data;
};

const setToken = (newToken: string) => {
  token = `tok ${newToken}`;
};

const toggleList = async (input: Show): Promise<{ newList: Show[] }> => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.put(`${BASE_URL}${API_KEY}`, { showToToggle: input }, config);
  return res.data;
};




interface Credentials {
    username: string;
    password: string;
}

const login = async (credentials: Credentials): Promise<User> => {
    const res = await axios.post<User>(`${BASE_URL}${API_KEY}`, credentials);
    return (res.config.data);
};

export const userService = {
    createUser,
    checkUser,
    setToken,
    toggleList,
    login,
};
