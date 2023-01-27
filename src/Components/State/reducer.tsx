import { User } from "./types";

export type Action =
    | {
        type: "SET_USER";
        payload: User;
    }

export { }