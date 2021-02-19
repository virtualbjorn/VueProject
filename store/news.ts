import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
declare const _: any;

export const state = () => ({
  news: [],
})

export const getters = getterTree(state, {
  
})

export const mutations = mutationTree(state, {
  setNews(state, news) {
    state.news = news;
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    getNews({ commit }, api) {
      return new Promise((resolve, reject) => {
        this.$axios({
          method: 'get',
          url: `/articles`
        }).then((response) => {
          commit('setNews', response.data.data);
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        });
      })
    }
  }
)
