/*
 * @Author: FuXingyuan
 * @Date: 2023-09-19 09:54:56
 * @FilePath: \table_compute\src\router\index.js
 * @LastEditors: FuXingyuan
 * @LastEditTime: 2023-09-19 11:44:56
 * @Server: 
 * @Description: 
 */

import { createRouter, createWebHistory } from "vue-router";
// , RouteLocationNormalized, RouteRecordRaw
import Home from "@/views/home.vue";
import TableIndex from "@/views/tables/index.vue";

const routes = [
    {
      path: "/",
      redirect: "/home",
    //   component: Layout,
      component: Home,
    //   meta: { title: "工作台", icon: "icon-desktop" },
    //   children: [
    //     {
    //       path: "/home",
    //       component: Home,
    //       meta: { title: "ui.router.pageHome", icon: "icon-home" }
    //     }
    //   ]
    },
    {
      path: "/home",
      component: Home,
      meta: { title: "Home", isNavigationMenu: false }
    },
    {
      path: "/tables/index",
      component: TableIndex,
      meta: { title: "表格", isNavigationMenu: false }
    },
    // {
    //   path: "/login",
    //   component: Login,
    //   meta: { title: "ui.router.pageLogin", isNavigationMenu: false }
    // },
    // {
    //   path: "/user/password",
    //   component: () => import("@/views/sys/user-update-password.vue"),
    //   meta: { title: "ui.user.links.editPassword", requiresAuth: true, isNavigationMenu: false }
    // },
    // {
    //   path: "/iframe/:id?",
    //   component: Iframe,
    //   meta: { title: "iframe", isNavigationMenu: false }
    // },
    {
      path: "/error",
      name: "error",
      component: Error,
      meta: { title: "ui.router.pageError", isNavigationMenu: false },
      beforeEnter(to, from, next) {
        // 拦截处理特殊业务场景
        // // 如果, 重定向路由包含__双下划线, 为临时添加路由
        if (/__.*/.test(to.redirectedFrom.path)) {
          return next(to.redirectedFrom.path.replace(/__.*/, ""));
        }
        next();
      }
    }
];

  
const router = createRouter({
    history: createWebHistory(), //createWebHistory() hash模式
    routes: routes
});

const errorRoute = [
    {
      path: "/:path(.*)*",
      redirect: { path: "/error", query: { to: 404 }, replace: true },
      meta: { isNavigationMenu: false }
    }
];  

export default router;