import Layout from '@/layout'

const distribusiRdt = {
  path: '/distribusi-rdt',
  component: Layout,
  redirect: '/distribusi-rdt/index',
  meta: {
    icon: 'library_books',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: 'index',
      component: () => import('@/views/distribusiRdt/list'),
      meta: {
        title: 'distribusi_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default distribusiRdt
