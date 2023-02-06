const { http } = require("@/utils");
const { makeAutoObservable } = require("mobx");

class ChannelStore {
  channelList = [];
  constructor() {
    makeAutoObservable(this);
  }

  loadChannelList = async () => {
    const res = await http.get("/channels");
    this.channelList = res.data.channels;
  };
}

export default ChannelStore;
