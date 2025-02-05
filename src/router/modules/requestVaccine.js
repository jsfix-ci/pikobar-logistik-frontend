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
      name: 'notVerifiedVaccine',
      meta: {
        title: 'not_verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/terverifikasi',
      component: () => import('@/views/requestVaccine'),
      name: 'verifiedVaccine',
      meta: {
        title: 'verified_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/belum-realisasi',
      component: () => import('@/views/requestVaccine'),
      name: 'approvedVaccine',
      meta: {
        title: 'not_yet_realized_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/selesai-realisasi',
      component: () => import('@/views/requestVaccine'),
      name: 'finalizedVaccine',
      meta: {
        title: 'realized_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/ditolak',
      component: () => import('@/views/requestVaccine'),
      name: 'rejectedVaccine',
      meta: {
        title: 'rejected_title',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    },
    {
      path: '/vaksin/detail/:id',
      component: () => import('@/views/requestVaccine/detail'),
      hidden: true,
      meta: {
        title: 'vaccine_request_detail_title',
        icon: 'library_books',
        noCache: true,
        roles: ['superadmin', 'dinkesprov', 'dinkeskota']
      }
    }
  ]
}

export default requestVaccine
