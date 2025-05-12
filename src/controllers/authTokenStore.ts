import { loadTokenFromDb, saveTokenToDb } from "../config/tokenStorage";

let userToken: any = null;

export const setUserToken = (token: any) => {
    userToken = token;
    saveTokenToDb(userToken);
};

export const getUserToken = () => {
    if (!userToken) {
        userToken = loadTokenFromDb();
    }
    return userToken;
}