// import Vue from 'vue'
import VueRouter from 'vue-router'

import i18n from '../docs/i18n'
import RouterComponent from './components/Router'
import DocumentComponent from './components/Document'

import FullComponent from './components/Full'
import ListComponent from './components/List'


// let examples = [
//   {
//     path: '',
//     component: FullComponent,
//   },
//   {
//     path: 'full',
//     component: FullExampleComponent,
//   },
// ]



const router = new VueRouter({
  mode: 'hash',
  fallback: false,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      let el = document.querySelector(to.hash)
      return { x: 0, y: el ? el.offsetTop : 0 }
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/:locale(' + Object.keys(i18n.messages).join('|') + ')?',
      component: RouterComponent,
      children: [
        {
          path: 'documents',
          component: DocumentComponent,
        },
        {
          path: '',
          component: FullComponent,
          // children: examples,
        },
        {
          path: 'list',
          component: ListComponent,
        },
      ]
    },
  ]
})
export default router
