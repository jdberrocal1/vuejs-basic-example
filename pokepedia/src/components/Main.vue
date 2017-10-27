<template>
<div class="container">
  <template v-if="pokemonList.length < 1">
      <img src="../assets/pokeloading.gif" alt="Pokeball" width="100%">
  </template>
  <template v-else>
    <img src="../assets/pokeball.png" alt="Pokeball" width="20%">
    <h1 class="title">Pokepedia</h1>
    <div class="row searchContainer">
      <div class="col-xs-12 col-sm-6 col-sm-offset-3">
        <input type="text" class="form-control search" placeholder="Search" v-model="search">
      </div>
    </div>
    <div class="row">
      <div class="col-xs-4 col-sm-3 col-md-2 pokemon" v-for="pokemon in filteredPokemonList" @click="goPokemon(pokemon)">
        <h4 class="">{{pokemon.name}}</h4>
      </div>
    </div>
  </template>
</div>
</template>

<script>
export default {
  computed: {
    pokemonList: function () {
      return this.$store.getters._getPokemonList
    },
    filteredPokemonList: function () {
      return this.pokemonList.filter(pokemon => {
        return pokemon.name.match(this.search)
      })
    }
  },
  data: function () {
    return {
      search: ''
    }
  },
  methods: {
    goPokemon (pokemon) {
      this.$router.push({ path: `/pokemon/${pokemon.name}` })
    }
  },
  mounted () {
    this.$store.dispatch('_setPokemonListAction')
  }
}
</script>
<style scoped>
.title {
  margin-top: 0px;
}

.pokemon {
  text-transform: capitalize;
  text-align: left;
  cursor: pointer;
}

.pokemon:hover > h4 {
  font-weight: bold;
}

.searchContainer {
  margin-bottom: 10px;
}

.search {
  text-align: center;
  font-size: 18px;
}
</style>

