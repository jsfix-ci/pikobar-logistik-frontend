import Layout from '@/layout'

const reports = {
  path: '/reports',
  component: Layout,
  redirect: '/reports/index',
  meta: {
    title: 'report',
    icon: 'fact_check',
    roles: ['superadmin', 'dinkesprov']
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
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/reports/goods_use_report',
      component: () => import('@/views/exception/underMaintenance'),
      name: 'goods_use_report',
      meta: {
        title: 'goods_use_report',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default reports
