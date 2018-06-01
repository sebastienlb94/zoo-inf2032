<template>
  <div class="searchbar">
    <icon :icon="['far', 'search']" class="icon" />
    <input placeholder="Rechercher un animal">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Searchbar'
});
</script>

<style lang="scss" scoped>
  .searchbar {
    position: relative;
    height: 48px;
    width: 40vw;
    max-width: 512px;
    margin: 0 24px;
    background: #F1F2F6;
    border-radius: 4px;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      top: 0;
      margin: 16px;
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
      background: none;
      padding: 4px 16px 4px 48px;
      font-size: 16px;
      border-radius: 4px;
      border: solid 2px #F1F2F6;
      box-sizing: border-box;
      transition: 0.4s;

      &:focus {
        outline: none;
        border: solid 2px $main-color;
      }
    }
  }
</style>
