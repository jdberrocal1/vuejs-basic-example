<template>
  <div class="container">
    <template v-if="pokemon">
      <template v-if="pokemon.notFound">
        <img src="../assets/pokecry.gif" alt="Pokeball" width="100%">
        <h2 class="title">{{pokemon.message}}</h2>
        <router-link 
            to="/"
            tag='button'
            class="btn btn-success">
               Home
        </router-link>
      </template>
      <template v-if="!pokemon.notFound">
        <h2 class="title">{{pokemon.name}}</h2>
        <div class="row">
          <div class="col col-xs-4">
            <b>General Info</b>
            <p>Height: {{pokemon.height}}</p>
            <p>Weight: {{pokemon.weight}}</p>
          </div>
          <div class="col col-xs-4">
            <b>Type</b>
            <p v-for="(pokemonType, index) in pokemon.types">{{pokemonType.type.name}}</p>
          </div>
          <div class="col col-xs-4">
            <b>Abilities</b>
            <p v-for="ability in pokemon.abilities">{{ability.ability.name}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col col-xs-6 col-sm-3">
            <img :src="pokemon.sprites.front_default" alt="Front" width="100%">
          </div>
          <div class="col col-xs-6 col-sm-3">
          <img :src="pokemon.sprites.front_shiny" alt="Front" width="100%">
          </div>
          <div class="col col-xs-6 col-sm-3">
            <img :src="pokemon.sprites.back_default" alt="Front" width="100%">
          </div>
          <div class="col col-xs-6 col-sm-3">
            <img :src="pokemon.sprites.back_shiny" alt="Front" width="100%">
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <img src="../assets/pokeloading.gif" alt="Pokeball" width="100%">
    </template>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        pokemonName: this.$route.params.name
      }
    },
    computed: {
      pokemon: function () {
        return this.$store.getters._getPokemon
      }
    },
    mounted () {
      this.$store.dispatch('_setPokemon', this.pokemonName)
    }
  }
</script>
<style scoped>
  .title {
    text-transform: capitalize;
  }
</style>

