import { ref } from '@vue/composition-api'
import store from '@/store'

export const useShopFiltersSortingAndPagination = () => {
  const filters = ref({
    q: '',
    // priceRangeDefined: 'all',
    // priceRange: [0, 100],
    categories: [],
    subcategories: [],
    brands: [],
    // ratings: null,
    page: 1,
    perPage: 12,
  })

  const filterOptions = {
    // priceRangeDefined: [
    //   { text: 'All', value: 'all' },
    //   { text: '<= $10', value: '<=10' },
    //   { text: '$10 - $100', value: '10-100' },
    //   { text: '$100 - $500', value: '100-500' },
    //   { text: '>= $500', value: '>=500' },
    // ],
    categories: [
      'Appliances',
      'Audio',
      'Cameras & Camcorders',
      'Car Electronics & GPS',
      'Cell Phones',
      'Computers & Tablets',
      'Health, Fitness & Beauty',
      'Office & School Supplies',
      'TV & Home Theater',
      'Video Games',
    ],
    subcategories: [
      'Appliances',
      'Audio',
      'Cameras & Camcorders',
      'Car Electronics & GPS',
      'Cell Phones',
      'Computers & Tablets',
      'Health, Fitness & Beauty',
      'Office & School Supplies',
      'TV & Home Theater',
      'Video Games',
    ],
    brands: ['Insignia™', 'Samsung', 'Metra', 'HP', 'Apple', 'GE', 'Sony', 'Incipio', 'KitchenAid', 'Whirlpool'],
    // ratings: [
    //   { rating: 4, count: 160 },
    //   { rating: 3, count: 176 },
    //   { rating: 2, count: 291 },
    //   { rating: 1, count: 190 },
    // ],
  }

  // Sorting
  const sortBy = ref({ text: 'Harga Terendah', value: 'price-asc' })
  const sortByOptions = [
    // { text: 'Featured', value: 'featured' },
    { text: 'Harga Terendah', value: 'price-asc' },
    { text: 'Harga Tertinggi', value: 'price-desc' },
  ]
  // Filtering
  const sortByCategory = ref({ text: 'Harga Terendah', value: 'price-asc' })
  const sortByCategoryOptions = [
    { text: 'Harga Terendah', value: 'price-asc' },
    { text: 'Harga Tertinggi', value: 'price-desc' },
  ]
  const sortBySubCategory = ref({ text: 'Harga Terendah', value: 'price-asc' })
  const sortBySubCategoryOptions = [
    { text: 'Harga Terendah', value: 'price-asc' },
    { text: 'Harga Tertinggi', value: 'price-desc' },
  ]
  const sortByBrand = ref({ text: 'Harga Terendah', value: 'price-asc' })
  const sortByBrandOptions = [
    { text: 'Harga Terendah', value: 'price-asc' },
    { text: 'Harga Tertinggi', value: 'price-desc' },
  ]

  return {
    // Filter
    filters,
    filterOptions,
    sortByCategory,
    sortByCategoryOptions,
    sortBySubCategory,
    sortBySubCategoryOptions,
    sortByBrand,
    sortByBrandOptions,

    // Sort
    sortBy,
    sortByOptions,
  }
}

export const useShopUi = () => {
  const itemView = 'grid-view'
  const itemViewOptions = [
    { icon: 'GridIcon', value: 'grid-view' },
    { icon: 'ListIcon', value: 'list-view' },
  ]

  // Pagination count <= required by pagination component
  const totalProducts = ref(null)

  return {
    itemView,
    itemViewOptions,
    totalProducts,
  }
}

export const useShopRemoteData = () => {
  const products = ref([])
  const fetchProducts = (...args) => store.dispatch('app-ecommerce/fetchProducts', ...args)

  return {
    products,
    fetchProducts,
  }
}
