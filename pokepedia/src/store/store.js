import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    pokemonList: []
  },
  getters: {
    _getPokemonList: state => {
      return state.pokemonList
    }
  },
  mutations: {
    _setPokemonListMutation: (state, payload) => {
      state.pokemonList = payload
    }
  },
  actions: {
    _setPokemonListAction: (context) => {
      Vue.http.get('pokemon/?limit=150')
        .then(response => {
          let data = response.data
          if (data) {
            context.commit('_setPokemonListMutation', data.results)
          }
        })
        .finally(() => {

        })
    }
  }
})
