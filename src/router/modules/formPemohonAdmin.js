import Layout from '@/layout'

const formPemohonAdmin = {
  path: '/pengajuan-logistik-admin',
  component: Layout,
  redirect: '/pengajuan-logistik-admin/form-pemohon',
  meta: {
    title: 'logistic_request_title',
    icon: 'library_add',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: [
    {
      path: 'form-pemohon',
      component: () => import('@/views/permohonan/formPemohonAdmin'),
      meta: {
        title: 'applicant_medical_tools_title',
        icon: 'library_add',
        noCache: true,
        roles: ['superadmin', 'dinkesprov']
      }
    }
  ]
}

export default formPemohonAdmin
