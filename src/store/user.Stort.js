import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class UserStore {
  userInfo = {};
  constructor() {
    makeAutoObservable(this);

    // configure({
    //   useProxies: "never",
    // });

    // useStrict(boolean);
  }

  async getUserInfo() {
    const res = await http.get("/user/profile");
    this.userInfo = res.data.data;
  }
}

export default UserStore;
