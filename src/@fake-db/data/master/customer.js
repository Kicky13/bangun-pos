import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  sales: [
    {
      id: 1,
      code: '2020102121',
      name: 'Abdullah',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0001',
      status: 'Active',
    },
    {
      id: 2,
      code: '2020102122',
      name: 'Azizah',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0002',
      status: 'Active',
    },
    {
      id: 3,
      code: '2020102123',
      name: 'Budi',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0003',
      status: 'Active',
    },
    {
      id: 4,
      code: '2020102124',
      name: 'Slamet',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0004',
      status: 'Terminated',
    },
    {
      id: 5,
      code: '2020102125',
      name: 'Panjul',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0005',
      status: 'Terminated',
    },
    {
      id: 6,
      code: '2020102126',
      name: 'Kipli',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0006',
      status: 'Active',
    },
    {
      id: 7,
      code: '2020102127',
      name: 'Supri',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0007',
      status: 'Terminated',
    },
    {
      id: 8,
      code: '2020102128',
      name: 'Torno',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0008',
      status: 'Terminated',
    },
    {
      id: 9,
      code: '2020102129',
      name: 'Siti',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0009',
      status: 'Active',
    },
    {
      id: 10,
      code: '2020102130',
      name: 'Putri',
      address: 'Surabaya',
      phone: '08291082891',
      total: '33600',
      paid: '33000',
      amount: '238.35',
      balance: '33000',
      toko: 'TB.0010',
      status: 'Terminated',
    },
  ],
  /* eslint-disable global-require */
}

mock.onGet('/app-data/customer').reply(() => [200, data.sales])