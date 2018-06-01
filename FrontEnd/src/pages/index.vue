<template>
  <section class="container">
    <topbar />

    <div class="animal-selector">
      <div v-for="animal in animals" :key="animal.id" class="animal" @click="addAnimal(animal)">
        <div :style="{'background-image': `url(${animal.imageUrl})`}" :title="animal.name" class="animal-icon" />
      </div>
    </div>

    <div v-if="!zoo" class="loader-ring"><div/><div/><div/><div/></div>
    <div v-else class="enclosure-container">
      <div v-for="enclosure in enclosures" :key="enclosure.id" :class="{ focus: focusedEnclosure && focusedEnclosure.id === enclosure.id }" class="enclosure" @click="focusEnclosure(enclosure)">
        <input v-model="enclosure.name" :placeholder="`Enclos ${enclosure.id}`" :ref="`enclosure-${enclosure.id}`" class="enclosure-name">
        <div class="animal-container">
          <div v-for="animal in enclosure.animals" :key="animal.id" class="animal" @click="removeAnimal(animal, enclosure)">
            <icon :icon="['fal', 'ban']" class="ban-icon" />
            <div :style="{'background-image': `url(${animal.imageUrl})`}" :title="animal.name" class="animal-icon" />
          </div>
        </div>
        <div class="data-container">
          {{ enclosure.animals.length }} {{ enclosure.animals.length === 1 ? 'animal' : 'animaux' }} |
        </div>
      </div>

      <div class="button-container">
        <div class="new-enclosure enclosure" @click="createEnclosure">
          <div class="add-icon">+</div>
          <div class="text">
            Créer un nouvel enclos
          </div>
        </div>
        <div class="new-animal enclosure" @click="createEnclosure">
          <div class="add-icon">+</div>
          <div class="text">
            Créer un nouvel animal
          </div>
        </div>
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
      zoo: null,
      animals: [],
      enclosures: [],
      focusedEnclosure: null
    };
  },
  created() {
    this.initZoo();
    this.initAnimals();
  },
  methods: {
    initZoo() {
      setTimeout(() => {
        this.zoo = {
          name: String,
          enclosures: [],
          creationDate: Date.now()
        };
      }, 1000);
      // this.$store.dispatch('Zoos/getZoo', 0).then((response) => {
      //   this.zoo = response;
      // });
    },
    initAnimals() {
      this.$store.dispatch('Animals/getAnimals').then((response) => {
        this.animals = response;
      });
    },
    createEnclosure() {
      const enclosure = {
        name: '',
        animals: [],
        id: (Math.random() * 1000000).toFixed(),
        focus: false
      };
      this.enclosures.push(enclosure);
      this.focusEnclosure(enclosure);

      // setTimeout(() => {
      //   console.log(this.$refs);
      //   console.log(`enclosure-${enclosure.id}`);
      //   console.log(this.$refs[`enclosure-${enclosure.id}`]);
      //   this.$refs[`enclosure-${enclosure.id}`].focus();
      // }, 600);
    },
    addAnimal(animalModel) {
      if (!this.focusedEnclosure) { return; }
      const animal = {
        name: animalModel.name,
        imageUrl: animalModel.imageUrl,
        id: (Math.random() * 10000000).toFixed()
      };
      this.focusedEnclosure.animals.push(animal);
    },
    removeAnimal(animal, enclosure) {
      enclosure.animals = enclosure.animals.filter(a => a !== animal);
    },
    focusEnclosure(enclosure) {
      this.focusedEnclosure = enclosure;
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
    padding: 128px 0 32px;

    .enclosure {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60vw;
      min-width: 480px;
      min-height: 128px;
      margin: 12px 0;
      background: #f1f2f6;
      border: solid 1px #d1d8e0;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(#0a3d62, 0.05);
      cursor: pointer;
      transition: 0.4s $easeOutSine;

      &:hover {
        box-shadow: 0 4px 12px rgba($focus-color, 0.1);
      }

      &.focus {
        border-color: $focus-color;
        box-shadow: 0 4px 12px rgba($focus-color, 0.1);
      }

      .enclosure-name {
        width: 100%;
        padding: 8px 12px;
        font-size: 16px;
        border: none;
        border-bottom: solid 1px #d1d8e0;
        background: none;
        transition: 0.2s $easeOutSine;

        &:focus {
          outline: none;
          border-color: $focus-color;
        }
      }

      .save-button {
        position: absolute;
        top: 4px;
        right: 6px;
        padding: 4px 12px;
        font-size: 12px;
        height: 24px;
        line-height: 12px;
        color: $white-color;
        background: $select-color;
        border: solid 2px $select-color;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba($select-color, 0.2);
        cursor: pointer;
        transition: 0.4s $easeOutSine;

        &:hover {
          background: none;
          color: $select-color;
        }
      }

      .animal-container {
        display: flex;
        flex-wrap: wrap;

        .animal {
          position: relative;
          display: flex;
          position: relative;
          $size: 48px;
          width: $size;
          height: $size;
          margin: 0;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.4s $easeOutSine;

          .ban-icon {
            position: absolute;
            z-index: 10;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            font-size: 48px;
            color: $error-color;
            transform: rotate(45deg);
            transition: 0.4s $easeOutSine;
          }

          .animal-icon {
            z-index: 5;
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

          &:hover {
            .ban-icon {
              transform: rotate(0);
              opacity: 1;
            }

            .animal-icon {
              opacity: 0.8;
            }
          }
        }
      }

      .data-container {
        padding: 8px 12px;
        border-top: solid 1px #d1d8e0;
        text-align: left;
      }
    }

    .button-container {
      display: flex;
      justify-content: space-between;
      width: 60vw;
      min-width: 480px;
    }

    .new-enclosure, .new-animal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 29vw;
      min-width: 220px;
      cursor: pointer;

      .add-icon {
        $radius: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: $radius;
        height: $radius;
        margin: 0 0 16px;
        border-radius: $radius;
        border: solid 2px #d0d0d0;
        color: #d0d0d0;
        font-size: 24px;
        font-weight: bold;
        transition: 0.2s $easeOutSine;
      }
      .text {

      }

      &:hover {
        box-shadow: 0 4px 8px rgba($focus-color, 0.1);

        .add-icon {
          color: $focus-color;
          border-color: $focus-color;
        }
      }
    }
  }
}
</style>
