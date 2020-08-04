import Layout from '@/layout'

const letter = {
  path: '/letter',
  component: Layout,
  redirect: '/letter/index',
  meta: {
    title: 'letter_manage',
    icon: 'library_books',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: '/letter/outgoing',
      component: () => import('@/views/OutgoingMail/list'),
      name: 'outgoing_mail',
      meta: {
        title: 'outgoing_mail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/letter/incoming',
      component: () => import('@/views/masterData/faskes/list'),
      name: 'incoming_mail',
      meta: {
        title: 'incoming_mail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
    // {
    //   path: '/letter/create',
    //   component: () => import('@/views/masterData/faskes/list'),
    //   name: 'FaskesDitolak',
    //   meta: {
    //     title: 'rejected_title',
    //     noCache: true,
    //     roles: ['superadmin', 'dinkesprov']
    //   }
    // }
  ]
}

export default letter
