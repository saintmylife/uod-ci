import axios from "/src/plugins/axios";

const state = {
  data: [],
  slider: [],
};
const getters = {
  getEventId: (state) => {
    return state.id;
  },
  getEventData: (state) => {
    return state.data;
  },
  getEventAsset: (state, type) => {
    if (state.data.hasOwnProperty(type)) {
      return state.data.type;
    }
    return null;
  },
  getEventSlider: (state) => {
    return state.slider;
  },
  getAssetUrl: (state) => {
    return (
      import.meta.env.VITE_AWS_URL +
      state.data.id +
      "-" +
      state.data.event_link +
      "/"
    );
  },
};
const mutations = {
  setEventId: (state, id) => {
    state.id = id;
  },
  setEventData: (state, payload) => {
    state.data = payload;
  },
  setEventSlider: (state, payload) => {
    state.slider = payload;
  },
};
const actions = {
  fetchEvent: ({ getters, commit }, id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("event/" + id)
        .then((res) => {
          commit("setEventData", res.data.data);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error.response.data.messages);
        });
    });
  },
  fetchSlider: ({ getters, commit }, id) => {
    return new Promise((resolve, reject) => {
      axios
        .get("slider/" + id)
        .then((res) => {
          commit("setEventSlider", res.data.data);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error.response.data.messages);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
