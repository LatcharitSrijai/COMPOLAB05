import { createRouter, createWebHistory } from 'vue-router'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

import nProgress from 'nprogress' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1')
      })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    
 {
  path: '/event-layout-view',
  name: 'event-layout-view',   
  component: EventLayoutView,
  props: true,
  beforeEnter: (to) => {
    const id = parseInt(to.params.id as string)
    const eventStore = useEventStore()

    nProgress.start()

    return EventService.getEvent(id)
      .then(response => {
        eventStore.setEvent(response.data)
        nProgress.done()
      })
      .catch(error => {
        nProgress.done()
        if (error.response && error.response.status === 404) {
          return {
            name: '404-resource-view',
            params: { resource: 'event' }
          }
        } else {
          return { name: 'network-error-view' }
        }
      })
  },
  children: [
    {
      path: 'event/:id', 
      name: 'event-detail-view',
      component: EventDetailView,
      props: true
    },
    {
      path: 'event/:id/register', 
      name: 'event-register-view',
      component: EventRegisterView,
      props: true
    },
    {
      path: 'event/:id/edit',   
      name: 'event-edit-view',
      component: EventEditView,
      props: true
    }
  ]
},

    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
  ],
  scrollBehavior(to,from,savedPosition)
  {
    if(savedPosition)
    {
      return savedPosition
    }
    else{
return {top: 0}
    }
    
  }
})


router.beforeEach(() => {
  nProgress.start()
})


router.afterEach(() => {
  nProgress.done()
})

export default router
