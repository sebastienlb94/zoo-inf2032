<template>
  <section class="container">
    <topbar />

    <div class="animal-selector">
      <div v-for="animal in animals" :key="animal.id" class="animal" @click="addAnimal(animal)">
        <div :style="{'background-image': `url(${animal.imageUrl})`}" :title="animal.name" class="animal-icon" />
        <!-- <div class="animal-name">{{ animal.name }}</div> -->
      </div>
    </div>

    <div class="enclosure-container">
      <div v-for="enclosure in enclosures" :key="enclosure.id" class="enclosure">
        <div v-for="animal in enclosure.animals" :key="animal.id" class="animal">
          <div :style="{'background-image': `url(${animal.imageUrl})`}" :title="animal.name" class="animal-icon" />
        </div>
      </div>

      <div class="new-enclosure enclosure" @click="createEnclosure"/>
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
      animals: [],
      enclosures: []
    };
  },
  created() {
    this.$store.dispatch('Animals/getAnimals').then((response) => {
      this.animals = response;
    });
  },
  methods: {
    createEnclosure() {
      const enclosure = {
        name: '',
        animals: [],
        id: (Math.random() * 1000000).toFixed()
      };
      this.enclosures.push(enclosure);
    },
    addAnimal(animalModel) {
      const animal = {
        name: animalModel.name,
        imageUrl: animalModel.imageUrl,
        id: (Math.random() * 10000000).toFixed()
      };
      this.enclosures[0].animals.push(animal);
    }
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
    width: 48px;
    height: 100%;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;

    .animal {
      display: flex;
      position: relative;
      $size: 48px;
      width: $size;
      height: $size;
      margin: 0;
      border-radius: 4px;
      cursor: pointer;

      .animal-icon {
        $size: 32px;
        margin: calc(24px - #{$size/2});
        width: $size;
        height: $size;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 2px;
        opacity: 0.4;
        transition: 0.2s $easeOutSine;
      }

      .animal-name {
        position: absolute;
        top: 0;
        left: 64px;
        opacity: 0;
      }

      &:hover {
        .animal-icon {
          transform: scale(1.25);
          opacity: 1;
        }
        .animal-name {
          opacity: 1;
        }
      }
    }
  }

  .enclosure-container {
    .enclosure {
      display: flex;
      flex-wrap: wrap;
      width: 60vh;
      min-width: 480px;
      height: 128px;
      margin: 12px 0;
      background: #f1f2f6;
      border: solid 1px #d1d8e0;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(#0a3d62, 0.05);

      .animal {
        display: flex;
        position: relative;
        $size: 48px;
        width: $size;
        height: $size;
        margin: 0;
        border-radius: 4px;

        .animal-icon {
          $size: 32px;
          margin: 8px;
          width: $size;
          height: $size;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 2px;
          transition: 0.2s $easeOutSine;
        }
      }
    }
  }
}
</style>
