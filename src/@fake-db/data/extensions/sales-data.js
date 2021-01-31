import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  sales: [
    {
      id: 1,
      date: '2020/11/18',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Draft',
      customer: 'Apple.inc',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      date: '2020/12/08',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Draft',
      customer: 'Apple.inc',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Paid',
    },
    {
      id: 3,
      date: '2020/10/29',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Draft',
      customer: 'Abdullah',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
    {
      id: 4,
      date: '2020/03/03',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Jan',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
    {
      id: 5,
      date: '2020/07/18',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Jan',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
    {
      id: 6,
      date: '2020/11/6',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Toko Baru',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
    {
      id: 7,
      date: '2020/11/18',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Apple.inc',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Paid',
    },
    {
      id: 8,
      date: '2020/01/11',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Samsung',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
    {
      id: 9,
      date: '2020/12/19',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Abdullah',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
    {
      id: 10,
      date: '2020/01/8',
      ref: 'posr-20201021-022129',
      biller: 'Abdullah',
      saleStatus: 'Completed',
      customer: 'Abdullah',
      total: '33600',
      paid: '33000',
      due: '238.35',
      paymentStatus: 'Due',
    },
  ],
  /* eslint-disable global-require */
}

mock.onGet('/app-data/sales').reply(() => [200, data.sales])
