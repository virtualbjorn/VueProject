import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import { FilterData, Filters, Product } from '~/models/product';
declare const _: any;
const ENDPOINTS = {
  GETPRODUCTS: '/products',
  GETPRODUCTSBYBRAND: '/products/brand',
  GETPRODUCTDETAILS: '/product-detail',
  GETPRODUCTFILTERS: '/products/filters',
  GETHOMEFEATUREDPRODUCTS: '/home/featured-products'
};

export const state = () => ({
  products: [] as any[],
  productsByBrand: [] as any[],
  heroSliderProducts: [] as any[],
  productsListingCarousel: [] as any[],
  truckFilteredProducts: [] as any[],
  filteredProducts: [] as any[],
  currentProductDetail: {},
  productFilters: {},
  productDetailsQuery: {}
})

export const getters = getterTree(state, {

})

export const mutations = mutationTree(state, {
  setProducts(state, products) {
    state.products = products;
  },
  setHeroSliderProducts(state, products) {
    state.heroSliderProducts = products;
  },
  setTruckFilteredProducts(state, products) {
    state.truckFilteredProducts = products;
  },
  setFilteredProducts(state, products) {
    state.filteredProducts = products;
  },
  setCurrentProductDetail(state, productDetail) {
    state.currentProductDetail = productDetail;
  },
  setProductsByBrand(state, productsByBrand) {
    state.productsByBrand = productsByBrand;
  },
  setProductFilters(state, productFilters) {
    state.productFilters = productFilters;
  },
  setProductDetailsQuery(state, productDetailsQuery) {
    state.productDetailsQuery = productDetailsQuery;
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    getProducts({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ENDPOINTS.GETPRODUCTS).then((response) => {
          commit('setProducts', response.data.data);
          resolve(response.data.data);
        });
      });
    },
    getProductsByBrand({ commit }, api) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ENDPOINTS.GETPRODUCTSBYBRAND + `/${api.brand}`).then((response) => {
          commit('setProductsByBrand', response.data.data);
          resolve(response.data.data);
        });
      });
    },
    getFeaturedProducts({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ENDPOINTS.GETPRODUCTS).then((response) => {
          commit('setProductsByBrand', response.data.data);
          resolve(response.data.data);
        });
      });
    },
    getHomeFeaturedProducts({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ENDPOINTS.GETHOMEFEATUREDPRODUCTS).then((response) => {
          commit('setProductsByBrand', response.data.data);
          resolve(response.data.data);
        });
      });
    },
    getProductDetail({ commit }, api): Promise<Product> {
      return new Promise((resolve, reject) => {
        this.$axios.get(ENDPOINTS.GETPRODUCTDETAILS + `${api.model ? '/model/' + api.model : ''}${api.drive ? '/drive/' + api.drive : ''}${api.brand ? '/brand/' + api.brand : ''}${api.type ? '/type/' + api.type : ''}`).then((response) => {
          commit('setCurrentProductDetail', response.data.data);
          resolve(response.data.data);
        }).catch(reject);
      })
    },
    getProductFilters({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios.get(ENDPOINTS.GETPRODUCTFILTERS).then((response) => {
          let drivesFilter: FilterData[] = _.map(response.data.drives, (drive) => ({ id: drive.id, key: drive.name, value: false, disabled: false }));
          let brandsFilter: FilterData[] = _.map(response.data.brands, (brand) => ({ id: brand.id, key: brand.name, value: false, disabled: false, logo: brand.logo }));
          let filters = { drives: drivesFilter, brands: brandsFilter };
          commit('setProductFilters', filters);
          resolve(filters);
        });
      });
    },
    getBrandProductFilters({ commit }, api) {
      return new Promise((resolve, reject) => {
        this.$axios.get(`/brands/${api.brand}/filters`).then((response) => {
          let drivesFilter: FilterData[] = _.map(response.data.drives, (drive) => ({ id: drive.id, key: drive.name, value: false, disabled: false }));
          let filters: Filters = { drives: drivesFilter, brands: [], promotion: { id: 1, disabled: false, key: 'promotion', value: false } };
          commit('setProductFilters', filters);
          resolve(filters);
        });
      });
    },
    updateBreadcrumbsProductDetailsQuery({ commit }, productDetailsQuery) {
      commit('setProductDetailsQuery', productDetailsQuery);
    }
  }
)
