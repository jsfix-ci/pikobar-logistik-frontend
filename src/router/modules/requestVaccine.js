import Layout from '@/layout'

const requestVaccine = {
  path: '/pengajuan-logistik/vaksin',
  component: Layout,
  redirect: '/pengajuan-logistik/vaksin/terverifikasi',
  meta: {
    title: 'vaccine_request_title',
    icon: 'vaccines',
    roles: ['superadmin', 'dinkesprov', 'dinkeskota']
  },
  active: false,
  children: [
    {
      path: '/vaksin/belum-terverifikasi',
      component: () => import('@/views/requestVaccine'),
      name: 'notVerified',
      meta: {
        title: 'not_verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/terverifikasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'verified',
      meta: {
        title: 'verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/belum-realisasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'not_yet_realized',
      meta: {
        title: 'not_yet_realized_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/selesai-realisasi',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'realized',
      meta: {
        title: 'realized_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/ditolak',
      component: () => import('@/views/pengajuanLogistik/list'),
      name: 'rejected',
      meta: {
        title: 'rejected_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/detail/:id',
      component: () => import('@/views/pengajuanLogistik/detail'),
      hidden: true,
      meta: {
        title: 'applicant_medical_tools_list_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
  ]
}

export default requestVaccine
