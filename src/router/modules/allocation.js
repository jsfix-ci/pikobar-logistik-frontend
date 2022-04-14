import Layout from '@/layout'

const allocation = {
  path: '/allocation',
  component: Layout,
  redirect: '/allocation/list',
  meta: {
    title: 'allocation',
    icon: 'receipt_long',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
  },
  active: false,
  children: [
    {
      path: '/allocation/list',
      component: () => import('@/views/allocation/list'),
      meta: {
        title: 'allocation',
        icon: 'receipt_long',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/allocation/create',
      component: () => import('@/views/allocation/form/form'),
      hidden: true,
      meta: {
        title: 'allocation',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/allocation/:id',
      component: () => import('@/views/allocation/detail/detail'),
      name: 'allocation',
      hidden: true,
      meta: {
        title: 'allocation',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
  ]
}

export default allocation
