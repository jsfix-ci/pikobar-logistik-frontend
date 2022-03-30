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
    },
    {
      path: '/realization/detail/:id',
      component: () => import('@/views/immunization/detail'),
      hidden: true,
      meta: {
        title: 'request_detail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    },
    {
      path: '/realization/update/:id',
      component: () => import('@/views/immunization/update'),
      hidden: true,
      meta: {
        title: 'vaccine_realization_update',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    }
  ]
}

export default pharmacy
