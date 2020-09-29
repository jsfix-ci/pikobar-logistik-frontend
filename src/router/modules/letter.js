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
      component: () => import('@/views/InboxMail/list'),
      name: 'incoming_mail',
      meta: {
        title: 'incoming_mail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/letter/outgoing/detail/:id',
      component: () => import('@/views/OutgoingMail/Detail'),
      name: 'outgoing_mail_detail',
      hidden: true,
      meta: {
        title: 'outgoing_mail_detail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/letter/incoming/detail/:id',
      component: () => import('@/views/InboxMail/Detail'),
      name: 'incoming_mail_detail',
      hidden: true,
      meta: {
        title: 'incoming_mail_detail',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default letter
