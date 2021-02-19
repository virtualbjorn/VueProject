import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';

export const state = () => ({})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree({state, getters, mutations}, {
	inquiry(methods, api) {
		return new Promise((resolve, reject) => {
			let queryParams: string = this.$queryString(api.data);
			this.$axios({
				method: 'post',
				data: api.data,
				url: `/inquiry?${queryParams}`
			}).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err)
			})
		})
	},
	question(methods, api) {
		return new Promise((resolve, reject) => {
			let queryParams: string = this.$queryString(api.data);
			this.$axios({
				method: 'post',
				data: api.data,
				url: `/question?${queryParams}`
			}).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err)
			})
		})
	},
	contactUs(methods, api) {
		return new Promise((resolve, reject) => {
			let queryParams: string = this.$queryString(api.data);
			this.$axios({
				method: 'post',
				data: api.data,
				url: `/contact-us?${queryParams}`
			}).then((response) => {
				resolve(response.data)
			}).catch((err) => {
				reject(err)
			})
		})
	}
})