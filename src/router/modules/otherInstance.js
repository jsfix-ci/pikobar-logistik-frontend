import Layout from '@/layout'

const otherInstance = {
  path: '/instansi',
  component: Layout,
  redirect: '/instansi/terdaftar',
  meta: {
    title: 'other_instance',
    icon: 'mdi-hospital',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: '/instansi/terdaftar',
      component: () => import('@/views/masterData/instance/list'),
      name: 'InstansiTerdaftar',
      meta: {
        title: 'other_instance',
        icon: 'corporate_fare',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default otherInstance
