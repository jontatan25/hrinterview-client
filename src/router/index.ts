import { createRouter, createWebHistory } from 'vue-router'
import Signin from '@/views/SigninView.vue'
import Signup from '@/components/TheSignup.vue'
import Signout from '@/components/TheSignout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signout',
      name: 'signout',
      component: Signout
    },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
