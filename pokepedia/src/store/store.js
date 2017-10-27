import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    pokemonList: [],
    pokemon: null
  },
  getters: {
    _getPokemonList: state => {
      return state.pokemonList
    },
    _getPokemon: state => {
      return state.pokemon
    }
  },
  mutations: {
    _setPokemonListMutation: (state, payload) => {
      state.pokemonList = payload
    },
    _setPokemonMutation: (state, payload) => {
      state.pokemon = payload
    }
  },
  actions: {
    _setPokemonListAction: (context) => {
      if (context.state.pokemonList.length) return
      Vue.http.get('https://pokeapi.co/api/v2/pokemon/?limit=150')
        .then(response => {
          let data = response.data
          if (data) {
            context.commit('_setPokemonListMutation', data.results)
          }
        })
        .finally(() => {

        })
    },
    _setPokemon: (context, pokemonName) => {
      let pokeBackup = {
        notFound: true,
        message: 'Pokemon not Found!'
      }

      context.commit('_setPokemonMutation', null)
      let pokemonResult = context.state.pokemonList.filter(pokemon => {
        return pokemon.name === pokemonName
      })
      if (pokemonResult.length) {
        Vue.http.get(pokemonResult[0].url)
        .then(response => {
          let data = response.data
          if (data) {
            context.commit('_setPokemonMutation', data)
          }
        })
        .catch(() => {
          context.commit('_setPokemonMutation', pokeBackup)
        })
        .finally(() => {
        })
      } else {
        context.commit('_setPokemonMutation', pokeBackup)
      }
    }
  }
})
