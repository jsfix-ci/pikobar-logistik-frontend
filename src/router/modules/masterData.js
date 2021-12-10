import Layout from '@/layout'

const masterData = {
  path: '/master-data',
  component: Layout,
  redirect: '/master-data/fasilitas-kesehatan/terdaftar',
  name: 'MasterData',
  meta: {
    title: 'master_data_title',
    icon: 'mdi-database',
    roles: ['superadmin', 'dinkesprov']
  },
  active: false,
  children: []
}

export default masterData
