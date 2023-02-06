import { makeAutoObservable } from "mobx";
import { getToken, http, removeToken, setToken } from "@/utils";

class LoginStore {
  loginOut = () => {
    this.token = "";
    removeToken();
  };
  // 这里哦！！
  token = getToken() || "";
  constructor() {
    makeAutoObservable(this);
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    this.token = res.data.token;
    // 还有这里哦！！
    setToken(this.token);
  };
}
export default LoginStore;
