import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";

export default createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    userLogin(state, user) {
      state.user = user;
    },
    RESET_USER(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  actions: {
    async logout({ commit }) {
      let response;
      const urlApi = process.env.VUE_APP_URL_API;
      const token = localStorage.getItem("token");
      try {
        response = await axios.get(urlApi + "logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.res && localStorage.getItem("token")) {
          commit("RESET_USER");
        }
      } catch (ex) {
        // Handle error
        localStorage.removeItem("token");
        console.log(ex);
      }
      localStorage.removeItem("token");
    },
  },
  plugins: [new VuexPersistence().plugin],
});
