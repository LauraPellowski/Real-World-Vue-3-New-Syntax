import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: route => ({ page: parseInt(route.query.page) || 1})
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: "",
          name: "event-details",
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent}
      },
    },
    {
      path: '/about-us',
      name: 'about',
      component: About,
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: '/about',
      redirect: { name: 'about'}
    }
    // {
    //   path: "*",
    //   component: NotFoundComponent
    // }
  ]
})

export default router
