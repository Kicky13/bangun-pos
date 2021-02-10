import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  products: [
    {
      id: 1,
      codeProd: '20201118-06143',
      productName: 'Martil',
      productImage: '-',
      brand: 'Brand 01',
      category: 'Peralatan',
      subCategory: 'Peralatan',
      type: '-',
      unit: 'EACH',
    },
    {
      id: 2,
      codeProd: '20201118-06133',
      productName: 'Paku',
      productImage: '-',
      brand: 'Brand 02',
      category: 'Peralatan',
      subCategory: 'Peralatan',
      type: '-',
      unit: 'PACK',
    },
    {
      id: 3,
      codeProd: '20201118-07881',
      productName: 'Gergaji',
      productImage: '-',
      brand: 'Brand 03',
      category: 'Peralatan',
      subCategory: 'Peralatan',
      type: '-',
      unit: 'EACH',
    },
    {
      id: 4,
      codeProd: '20201118-08231',
      productName: 'Sekop',
      productImage: '-',
      brand: 'Brand 04',
      category: 'Peralatan',
      subCategory: 'Peralatan',
      type: '-',
      unit: 'EACH',
    },
    {
      id: 5,
      codeProd: '20201118-12892',
      productName: 'Galvalum',
      productImage: '-',
      brand: 'Brand 05',
      category: 'Besi',
      subCategory: 'Material',
      type: '-',
      unit: 'EACH',
    },
    {
      id: 6,
      codeProd: '20201118-46782',
      productName: 'Pipa PVC',
      productImage: '-',
      brand: 'Brand 06',
      category: 'Material',
      subCategory: 'Material',
      type: '-',
      unit: 'PCS',
    },
    {
      id: 7,
      codeProd: '20201118-023231',
      productName: 'Kuas',
      productImage: '-',
      brand: 'Brand 07',
      category: 'Peralatan',
      subCategory: 'Peralatan',
      type: '-',
      unit: 'PCS',
    },
    {
      id: 8,
      codeProd: '20201118-091182',
      productName: 'Semen Putih 50 Kg',
      productImage: '-',
      brand: 'Brand 08',
      category: 'Semen',
      subCategory: 'Semen',
      type: 'PCC',
      unit: 'SAK',
    },
    {
      id: 9,
      codeProd: '20201118-091183',
      productName: 'Semen Gresik 50 Kg',
      productImage: '-',
      brand: 'Brand 09',
      category: 'Semen',
      subCategory: 'Semen',
      type: 'PCC',
      unit: 'SAK',
    },
    {
      id: 10,
      codeProd: '20201118-46782',
      productName: 'Semen Gresik 40 Kg',
      productImage: '-',
      brand: 'Brand 10',
      category: 'Semen',
      subCategory: 'Semen',
      type: 'PCC',
      unit: 'SAK',
    },
  ],

  /* eslint-disable global-require */
}

mock.onGet('/product/products').reply(() => [200, data.products])