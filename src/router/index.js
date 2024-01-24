import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/UserStore";
//liceth olmos
//importacion de componentes o vistas

import pageLoginLayout from "../components/pageLoginLayout.vue";
import pageLogin from "../views/pageLogin.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/LogIn.vue";
import protectedUser from "../components/protectedUser.vue";
import categories from "../views/Categories.vue";
//rutas 
const routes = [

  {
    path: "/",
    name: "bypageLogin",
    component: pageLoginLayout,
    children: [
      {
        path: "/",
        name: "bypageLogin",
        component: pageLogin,
      },

      {
        path: "/register",
        name: "byRegister",
        component: SignUp,
      },
      {
        path: "/login",
        name: "byLogin",
        component: Login,
      },
    ],
  },
  {
    path: "/protectedUser",
    name: "protectedUser",
    component: protectedUser,
    children: [
      {
        path: "/categories",
        name: "bycategories",
        component: categories,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
    // Registra si la ruta requiere autenticación
  console.log(to.meta.auth);
  const requiredAuth = to.meta.auth;
  // Accede al almacén de estado de usuario (useUserStore)
  const UserStore = useUserStore();
// Comprueba si el usuario tiene un token de autenticación
  if (UserStore.token) {
    return next();
  }
// Si la ruta requiere autenticación o si hay información de usuario en la sesión
  if (requiredAuth || sessionStorage.getItem("user")) {
    await UserStore.refreshToken();
    if (UserStore.token) {
      return next();
    }
    return next("/");
  }
  return next();
});

export default router;
