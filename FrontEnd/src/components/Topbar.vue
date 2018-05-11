<template>
  <div class="topbar">
    <div class="logo"/>
    <searchbar/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Searchbar from '~/components/Searchbar.vue';

export default Vue.extend({
  components: {
    Searchbar
  }
});
</script>

<style lang="scss" scoped>
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    background: #fff;
    box-shadow: 0 -8px 24px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;

    .logo {
      $radius: 256px;
      width: $radius*2;
      height: $radius;
      background: #ff6b81;
      border-radius: $radius;
      transform: translateX(-50%);
      transition: 0.4s;

      &:hover {
        $radius: 288px;
        width: $radius*2;
        height: $radius;
        margin-right: -64px;
      }
    }
  }
</style>
