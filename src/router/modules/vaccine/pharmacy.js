import Layout from '@/layout'

const pharmacy = {
  path: '/pharmacy',
  component: Layout,
  redirect: '/pharmacy/realization',
  meta: {
    title: 'pharmacy',
    icon: 'medication',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
    isVaccineModule: true
  },
  active: false,
  children: [
    {
      path: '/realization',
      component: () => import('@/views/pharmacy/realization'),
      name: 'realization',
      meta: {
        title: 'realization',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    }
  ]
}

export default pharmacy
