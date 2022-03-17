import Layout from '@/layout'

const immunization = {
  path: '/immunization',
  component: Layout,
  redirect: '/immunization/admin-verification',
  meta: {
    title: 'immunization',
    icon: 'vaccines',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
    isVaccineModule: true
  },
  active: false,
  children: [
    {
      path: '/admin-verification',
      component: () => import('@/views/immunization/adminVerification'),
      name: 'adminVerification',
      meta: {
        title: 'admin_verification',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    },
    {
      path: '/recommendation',
      component: () => import('@/views/immunization/recommendation'),
      name: 'recommendation',
      meta: {
        title: 'verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota'],
        isVaccineModule: true
      }
    },
    {
      path: '/admin-verification/detail/:id',
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
      path: '/recommendation/detail/:id',
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

export default immunization
