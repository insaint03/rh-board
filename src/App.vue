<template>
  <div id="app">
    <md-app class="md-layout">
      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import TableauCard from '@/components/TableauCard.vue';
// import boards from '@/boards.js';

export default {
  name: 'App',
  props: {
    configure: Object,
    
  },
  computed: {
    routes() {
      return this.$router.getRoutes().map((r)=>r.path);
    }
  },
  // components: {
  //   TableauCard,
  // },
  mounted() {
  },
  data() {
    return {
      // tbs: boards.tableau,
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
