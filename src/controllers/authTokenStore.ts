let userToken: any = null;

export const setUserToken = (token: any) => {
    userToken = token;
};

export const getUserToken = () => {
    return userToken;
}