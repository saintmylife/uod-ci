import { createStore, createLogger } from "vuex";
import events from "./modules/events";
import guests from "./modules/guests";

export default createStore({
  state: {
    qrImage: null,
  },
  getters: {
    getQrImage: (state) => {
      return state.qrImage;
    },
  },
  mutations: {
    setQrImage: (state, payload) => {
      state.qrImage = payload;
    },
  },
  modules: {
    events,
    guests,
  },
  strict: true,
  debug: [createLogger()],
});
