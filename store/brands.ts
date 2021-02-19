import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import { Brand } from '@/models/brands';

declare var _: any;
const ENDPOINTS: any = {
	GETBRAND: '/brands',
	GETALLBRANDS: '/brands/details',
	GETALLBRANDSSHORT: '/brands/details/short'
}

export const state = () => ({
	items: [] as Brand[],
	item: {} as Brand,
	itemNav: [] as Brand[]
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
	setCurrentItem(state, item: Brand) {
		state.item = item;
	},
	setItem(state, item: Brand) {
		state.items.push(item);
	},
	setAllItems(state, items: Array<Brand>) {
		state.items = items;
	},
	setItemNav(state, navs: Array<Brand>) {
		state.itemNav = navs;
	}
})

export const actions = actionTree({state, getters, mutations}, {
	getAllBrands({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`${ENDPOINTS.GETALLBRANDS}`)
				.then(response => {
					commit('setAllItems', response.data.brands);
					resolve();
				}).catch(reject);
		});
	},
	getAllBrandShort({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`${ENDPOINTS.GETALLBRANDSSHORT}`)
				.then(response => {
					commit('setItemNav', response.data.brands);
					resolve();
				})
				.catch(reject);
		});
	},
	getBrandByName({ commit, state }, api) {
		let brandName: string = api.brandName.toLowerCase();
		let result = _.find(state.items, ({name}) => name.toLowerCase() == brandName);
		return new Promise((resolve, reject) => {
			if (!result) {
				this.$axios.get(`${ENDPOINTS.GETBRAND}/${brandName}`)
					.then(response => {
						commit('setItem', response.data.data);
						commit('setCurrentItem', response.data.data);
						resolve();
					}).catch(reject);
					return;
			}
			commit('setCurrentItem', result);
			resolve();
		});
	}
})