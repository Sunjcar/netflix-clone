import axios from "axios";
import { Show, User } from "../Components/State/types";
import { URL } from "./tmdbAPI";

interface userAccess {
    username: string;
    password: string;
}

let token: string

const createUser = async ( newUser: userAccess): Promise <User> => {
    const res = await axios.post(URL, newUser)
    return res.data
}

const checkUser = async (username: string) : Promise <boolean> => {
    const res = await axios.post(`${URL}/check`, {username})
    return res.data
}

const setToken = (newToken:string) => {
    token = `tok ${newToken}`
}

const toggleList = async (input: Show): Promise <{newList: Show[]}> => {
    const config = {
        headers: {Authorization: token}
    }

    const res = await axios.put(URL, {showToToggle: input}, config);
    return res.data
}

export const userService = {
    createUser,
    checkUser,
    setToken,
    toggleList,
}