export const data = {
  info: [
    {
      title: 'Tanggal Pengajuan',
      value: '11 Juli 2021'
    },
    {
      title: 'Status',
      value: 'Telah Disetujui'
    },
    {
      title: 'Disetujui oleh',
      value: 'Jabar Digital Service'
    },
    {
      title: 'Nomor ID',
      value: '123321'
    }
  ],
  identity: [
    {
      title: 'Identitas Instansi',
      data: [
        {
          title: 'Jenis Instansi',
          value: 'Rumah Sakit'
        },
        {
          title: 'Nomor Telepon',
          value: '089123123123'
        },
        {
          title: 'Kelurahan',
          value: 'Sukajadi'
        },
        {
          title: 'Nama Instansi',
          value: 'Rumah Sakit Hasan Sadikin'
        },
        {
          title: 'Kota/Kab.',
          value: 'Kota Bandung'
        },
        {
          title: 'Alamat lengkap',
          value: 'loremasdfasdfasdfadsfadfasdfadfadfasdfadsfaasdfas hdhddghgfhgfhgfhgfhfhgfhgfgfgfhgfgff'
        },
        {
          title: 'Tipe Instansi',
          value: 'RS'
        },
        {
          title: 'Kecamatan',
          value: 'Bandung'
        },
        {
          title: 'Status Rujukan',
          value: 'testing status'
        }
      ]
    },
    {
      title: 'Identitas Pemohon',
      data: [
        {
          title: 'Nama Pemohon',
          value: 'Lies Irmawanti'
        },
        {
          title: 'Email Pemohon',
          value: 'lies.irmawanti@gmail.com'
        },
        // {
        //   type: 'image',
        //   title: 'KTP/Kartu Pegawai/Surat Tugas',
        //   value: 'https://user-images.githubusercontent.com/9880869/192418130-510d8940-f558-4f86-82c8-c440467b0500.png'
        // },
        {
          type: 'link',
          title: 'KTP/Kartu Pegawai/Surat Tugas',
          name: 'Nama file',
          value: 'https://www.ojk.go.id/keuanganberkelanjutan/BE/uploads/peraturanuu/files/file_d17cf7e1-32b6-4b0a-a21d-183c63f7689b-13012022192056.pdf'
        },
        {
          title: 'Jabatan Pemohon',
          value: 'Kepala Bagian Administrasi Umum'
        },
        {
          title: 'Nomor Handphone Pemohon',
          value: '089123123231'
        },
        {
          title: 'Nomor Handphone Pengganti',
          value: '089123123231'
        }
      ]
    }
  ],
  status: [
    {
      type: 'regular',
      title: 'Urgensi Permohonan',
      content: 'Tandai permohonan sebagai darurat',
      strong: 'darurat',
      button_label: 'TANDAI DARURAT'
    },
    // {
    //   type: 'urgent',
    //   title: 'Urgensi Permohonan',
    //   content: 'Permohonan ini adalah',
    //   strong: 'Permohonan Darurat',
    //   button_label: 'DARURAT!'
    // },
    {
      type: 'status-request',
      title: 'Status Permohonan',
      content: 'Permohonan ini berada pada tahapan',
      strong: 'Realisasi Salur',
      button_label: 'KEMBALIKAN KE STATUS SEBELUMNYA'
    }
  ],
  letter: {
    name: 'Surat No. 123',
    url: 'https://google.com'
  },
  statusReal: {
    status: 'verification',
    label: 'Terverifikasi'
  }
}
