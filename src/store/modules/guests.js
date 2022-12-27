import axios from "/src/plugins/axios";

const state = {
  data: [],
};
const getters = {
  getGuestData: (state) => {
    return state.data;
  },
};
const mutations = {
  setGuestId: (state, id) => {
    state.id = id;
  },
  setGuestData: (state, payload) => {
    state.data = payload;
  },
};
const actions = {
  fetchGuest: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios
        .get("guest/getGuest/" + payload.guest_id + "/" + payload.event_id)
        .then((res) => {
          commit("setGuestData", res.data.data);
          resolve(res.data.data);
        })
        .catch((error) => {
          reject(error.response.data.messages);
        });
    });
  },
  updateGuestConfirmation: ({ getters, commit }, payload) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("_method", "PUT");
      data.append("kehadiran", payload.kehadiran);
      data.append("jumlah_orang", payload.jumlah_orang);
      axios
        .post(`guest/confirm/${getters.getGuestData.id}`, {
          _method: "PUT",
          kehadiran: payload.kehadiran,
          jumlah_orang: payload.jumlah_orang,
        })
        .then((res) => {
          commit("setGuestData", res.data.data);
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateGuestConfirmationWithoutRSVPSet: ({ getters, commit }, payload) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("_method", "PUT");
      data.append("kehadiran", payload.kehadiran);
      data.append("jumlah_orang", payload.jumlah_orang);
      axios
        .post(`guest/confirm-without-rsvp-set/${getters.getGuestData.id}`, {
          _method: "PUT",
          kehadiran: payload.kehadiran,
          jumlah_orang: payload.jumlah_orang,
        })
        .then((res) => {
          commit("setGuestData", res.data.data);
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateGuestConfirmationCallback: ({getters, commit}, payload) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append("confirmation", payload.kehadiran);
      data.append("persons", payload.jumlah_orang);
      const axiosInstance = axios.create(
        {
          baseURL: 'https://reddonedigital.com/UndanganOnline/callbak_confirmation/'
        }
      )
      axiosInstance.post(
        getters.getGuestData.event_id + '/' + getters.getGuestData.id, 
        data
      ).then(() => {
        resolve(true);
      }).catch((err)=> {
        reject(err);
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
