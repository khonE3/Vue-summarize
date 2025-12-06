import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home - Vue Playground' }
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/TodosView.vue'),
      meta: { title: 'Todo List' }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: { title: 'Shop' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { title: 'Shopping Cart' }
    },
    {
      path: '/forms',
      name: 'forms',
      component: () => import('../views/FormsView.vue'),
      meta: { title: 'Form Examples' }
    },
    {
      path: '/directives',
      name: 'directives',
      component: () => import('../views/DirectivesView.vue'),
      meta: { title: 'Directives Demo' }
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('../views/LifecycleView.vue'),
      meta: { title: 'Lifecycle Hooks' }
    },
    {
      path: '/watchers',
      name: 'watchers',
      component: () => import('../views/WatchersView.vue'),
      meta: { title: 'Watchers Demo' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About' }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Vue Playground'
  next()
})

export default router
