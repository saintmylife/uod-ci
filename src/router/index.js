import { createRouter, createWebHistory } from "vue-router";
import store from "/src/store";
import Cover from "/src/pages/Cover.vue";
import Invitation from "/src/pages/Invitation.vue";
// import Invitation from "/src/pages/FormPerson.vue";
import Summary from "/src/pages/Summary.vue";
import NotFound from "/src/pages/NotFound.vue";
const routes = [
  {
    path: "/:guest_slug/:event_slug/:guest_id(\\d+)/:event_id(\\d+)?",
    name: "Cover",
    component: Cover,
  },
  {
    path: "/invitation/:guest_slug/:event_slug/:guest_id(\\d+)/:event_id(\\d+)",
    name: "Invitation",
    component: Invitation,
  },
  {
    path: "/summary/:guest_slug/:guest_id(\\d+)/:event_id(\\d+)",
    name: "Summary",
    component: Summary,
  },
  { path: "/error/404", name: "404", component: NotFound },
  { path: "/:pathMatch(.*)*", redirect: "/error/404" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (to.name === "404" || to.name === "Cover") &&
    store.state.events.data.length === 0
  ) {
    next();
  } else {
    if (store.state.events.data.length === 0) {
        next({
          name: "Cover",
          replace: true,
          params: {
            guest_slug: to.params.guest_slug,
            event_slug: to.params.event_slug,
            event_id: to.params.event_id,
            guest_id: to.params.guest_id,
          },
        });
    } else {
      next();
    }
  }
});

export default router;
