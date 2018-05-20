<template>
  <section class="container">
    <topbar />

    <div class="animal-selector">
      <div v-for="animal in animals" :key="animal.id" class="animal">
        <div :style="{'background-image': `url(${animal.imageUrl})`}" class="animal-icon" />
        <div class="animal-name">{{ animal.name }}</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

import Topbar from '~/components/topbar';

export default Vue.extend({
  components: {
    Topbar
  },
  data() {
    return {
      animals: []
    };
  },
  created() {
    this.$store.dispatch('Animals/getAnimals').then((response) => {
      this.animals = response;
    });
  }
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .animal-selector {
    position: fixed;
    top: 64px;
    left: 0;
    width: 64px;
    height: 100%;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;

    .animal {
      display: flex;
      position: relative;
      $size: 64px;
      width: $size;
      height: $size;
      margin: 0;
      border-radius: 4px;
      cursor: pointer;

      .animal-icon {
        $size: 32px;
        margin: calc(32px - #{$size/2});
        width: $size;
        height: $size;
        background-size: contain;
        background-position: center center;
        opacity: 0.4;
        transition: 0.4s $easeOutSine;
      }

      .animal-name {
        position: absolute;
        top: 0;
        left: 64px;
        opacity: 0;
      }

      &:hover {
        .animal-icon {
          opacity: 1;
        }
        .animal-name {
          opacity: 1;
        }
      }
    }
  }
}
</style>
