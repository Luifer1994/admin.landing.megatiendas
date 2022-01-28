import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/clients",
    name: "Clients",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Clients.vue"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/DetailClient.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function validateSesion() {
  const urlApi = process.env.VUE_APP_URL_API;
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(urlApi + "validate-sesion", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data) {
      return true;
    }
  } catch (error) {
    if (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
      window.location.reload();
    }
  }
}

function existToken() {
  if (localStorage.getItem("token")) {
    return true;
  }
}

router.beforeEach((to, from, next) => {
  var isLogin = existToken();
  if (isLogin && validateSesion()) {
    next();
  } else {
    if (to.name === "Login") {
      next();
    } else {
      next("login");
    }
  }
});

export default router;
