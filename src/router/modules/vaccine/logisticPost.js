import Layout from '@/layout'

const logisticPost = {
  path: '/logistic-post',
  component: Layout,
  redirect: '/logistic-post/realization',
  meta: {
    title: 'task_force',
    icon: 'shield',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
    isVaccineModule: true
  },
  active: false,
  children: [
    {
      path: '/delivery-plan',
      component: () => import('@/views/logisticPost/deliveryPlan'),
      name: 'release_order',
      meta: {
        title: 'release_order',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    },
    {
      path: '/delivery-plan/detail/:id',
      component: () => import('@/views/immunization/detail'),
      hidden: true,
      meta: {
        title: 'request_detail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    }
  ]
}

export default logisticPost
