import Layout from '@/layout'

const dashboard = {
  path: '/',
  component: Layout,
  redirect: 'dashboard',
  meta: {
    icon: 'dashboard',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
  },
  active: false,
  children: [
    {
      path: '/',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true,
        affix: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota', 'faskes']
      }
    }
  ]
}

export default dashboard
