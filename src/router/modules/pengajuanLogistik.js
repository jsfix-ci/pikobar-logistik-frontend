import Layout from '@/layout'

const pengajuanLogistik = {
  path: '/pengajuan-logistik/alat-kesehatan',
  component: Layout,
  redirect: '/pengajuan-logistik/alat-kesehatan/terverifikasi',
  meta: {
    title: 'logistic_request_title',
    icon: 'medication',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: '/alat-kesehatan/belum-terverifikasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'notVerified',
      meta: {
        title: 'not_verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/alat-kesehatan/terverifikasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'verified',
      meta: {
        title: 'verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/alat-kesehatan/disetujui',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'approved',
      meta: {
        title: 'approved_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/alat-kesehatan/ditolak',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'rejected',
      meta: {
        title: 'rejected_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    },
    {
      path: '/alat-kesehatan/detail/:id',
      component: () => import('@/views/pengajuanLogistik/detail'),
      hidden: true,
      meta: {
        title: 'applicant_medical_tools_list_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default pengajuanLogistik
