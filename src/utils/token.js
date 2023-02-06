const TOKEN_KEY = "key_pc";

const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};
const setToken = (user_token) => {
  return window.localStorage.setItem(TOKEN_KEY, user_token);
};
const removeToken = () => {
  return window.localStorage.removeItem(TOKEN_KEY);
};

export { getToken, setToken, removeToken };
