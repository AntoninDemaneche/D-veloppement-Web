import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Secret from "../views/Secret.vue";
import Dashboard from "../components/Dashboard.vue";
import NewEmployee from "../components/NewEmployee.vue";
import ViewEmployee from "../components/ViewEmployee.vue";
import EditEmployee from "../components/EditEmployee.vue";


import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/secret",
    name: "secret",
    component: Secret,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dash",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/new",
    name: "new-employee",
    component: NewEmployee
  },
  {
    path: "/view",
    name: "view-employee",
    component: ViewEmployee
  },
  {
    path: "/edit/:employee_id",
    name: "edit-employee",
    component: EditEmployee
  },
  {
    path: "/:employee_id",
    name: "view-employee",
    component: ViewEmployee
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;