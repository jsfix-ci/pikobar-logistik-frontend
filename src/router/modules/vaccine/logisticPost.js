import Layout from '@/layout'

const logisticPost = {
  path: '/logistic-post',
  component: Layout,
  redirect: '/logistic-post/realization',
  meta: {
    title: 'logistic_post',
    icon: 'inventory',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
    isVaccineModule: true
  },
  active: false,
  children: [
    {
      path: '/delivery-plan',
      component: () => import('@/views/logisticPost/deliveryPlan'),
      name: 'delivery_plan',
      meta: {
        title: 'delivery_plan',
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
