import Layout from '@/layout'

const reports = {
  path: '/reports',
  component: Layout,
  redirect: '/reports/index',
  meta: {
    title: 'report',
    icon: 'fact_check',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
  },
  active: false,
  children: [
    {
      path: '/reports/goods_receipt_report',
      component: () => import('@/views/reports/goods_receipt_report/list'),
      name: 'goods_receipt_report',
      meta: {
        title: 'goods_receipt_report',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/reports/goods_use_report',
      component: () => import('@/views/reports/goods_use_report/list'),
      name: 'goods_use_report',
      meta: {
        title: 'goods_use_report',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/reports/allocation',
      component: () => import('@/views/reports/allocation/list'),
      name: 'allocation',
      meta: {
        title: 'allocation',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/reports/allocation/:id',
      component: () => import('@/views/reports/allocation/detail'),
      name: 'allocation',
      hidden: true,
      meta: {
        title: 'allocation',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/reports/goods_receipt_report/:id',
      component: () => import('@/views/reports/goods_receipt_report/detail'),
      hidden: true,
      meta: {
        title: 'goods_receipt_report',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
  ]
}

export default reports
