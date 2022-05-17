import Layout from '@/layout'

const archive = {
  path: '/archive',
  component: Layout,
  redirect: '/archive/index',
  meta: {
    title: 'archive',
    icon: 'archive',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
    isVaccineModule: true,
    showParentOnly: true
  },
  active: false,
  children: [
    {
      path: 'index',
      component: () => import('@/views/archive'),
      name: 'archive',
      meta: {
        title: 'archive',
        icon: 'inventory',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    }
  ]
}

export default archive
