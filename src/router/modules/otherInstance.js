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
      path: '/instansi/belum-terdaftar',
      component: () => import('@/views/masterData/instance/list'),
      name: 'FaskesBelumTerdaftar',
      meta: {
        title: 'not_registered_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/instansi/terdaftar',
      component: () => import('@/views/masterData/faskes/list'),
      name: 'FaskesTerdaftar',
      meta: {
        title: 'registered_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/instansi/ditolak',
      component: () => import('@/views/masterData/faskes/list'),
      name: 'FaskesDitolak',
      meta: {
        title: 'rejected_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default otherInstance
