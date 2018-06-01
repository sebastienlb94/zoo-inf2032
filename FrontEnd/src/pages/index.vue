<template>
  <section class="container">
    <div v-if="zoos.length <= 0" class="loader-ring"><div/><div/><div/><div/></div>
    <div v-else class="zoo-container">
      <router-link v-for="zoo in zoos" :to="{ name: 'zoo-zoo', params: { zoo: zoo.id } }" :key="zoo.id" class="zoo">
        <div class="name">
          {{ zoo.name }}
        </div>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  components: {},
  data() {
    return {
      zoos: []
    };
  },
  created() {
    this.initZoos();
  },
  methods: {
    initZoos() {
      this.$store.dispatch('Zoos/getZoos').then((response) => {
        this.zoos = response;
      });
    }
  }
});
</script>

<style lang="scss" scoped>
$jungle-color: #6ab04c;

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(-30deg, #f9f9f9, #fefefe);

  .zoo-container {
    display: flex;

    .zoo {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 256px;
      height: 128px;
      margin: 12px 24px;
      text-decoration: none;
      background: #f1f2f6;
      border: solid 1px #d1d8e0;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(#0a3d62, 0.05);
      overflow: hidden;
      cursor: pointer;
      transition: 0.4s $easeOutSine;

      &:hover {
        box-shadow: 0 4px 12px rgba($focus-color, 0.1);
        border-color: $jungle-color;
      }

      &:before {
        content: "";
        position: absolute;
        top: -950px;
        right: -256px;
        left: -256px;
        height: 1024px;
        // background: $jungle-color;
        background: linear-gradient($main-color 75%, $jungle-color 100%);

        border-radius: 512px;
        z-index: 0;
      }

      .name {
        width: 100%;
        margin: 16px 0 8px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: $white-color;
        z-index: 1;
      }
    }
  }
}
</style>
