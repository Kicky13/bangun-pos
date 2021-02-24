import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  customer: [
    {
      id: 1,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 2,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 3,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 4,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 5,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 6,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },{
      id: 7,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 8,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 9,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
    {
      id: 10,
      custCode: '0452297501931931',
      customer: 'Munib',
      nohp: 081234567890,
      jumTrans: 50,
      totalTrans: 5000000,
      sudahBayar: 4500000,
      sisaHutang: 500000,
    },
  ],
  /* eslint-disable global-require */
}

mock.onGet('/app-data/customerUser').reply(() => [200, data.sales])
