<template>
  <section class="container">
    <topbar/>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Topbar from '~/components/Topbar.vue';

export default Vue.extend({
  components: {
    Topbar
  },

  data() {
    return {
    };
  },

  methods: {}
});
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #F1F2F6;
}
</style>
