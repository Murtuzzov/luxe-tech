import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
  ],
  // Добавляем scrollBehavior
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // если есть сохранённая позиция (назад/вперёд)
    } else {
      return { top: 0 }; // иначе скроллим наверх
    }
  },
});

export default router;
