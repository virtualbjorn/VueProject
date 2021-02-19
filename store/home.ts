import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';

export const state = () => ({
    homeData: {}
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  setHomeData(state, homeData) {
    state.homeData = homeData;
  }
})

export const actions = actionTree(
  {state, getters, mutations}, 
  {
    getHomeData({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios({
          method: 'get',
          url: `/home`
        }).then((response) => {
          commit('setHomeData', response.data.data);
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        });
      })
    }
  }
)