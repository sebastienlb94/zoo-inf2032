<template>
  <section class="container">
    <topbar />

    <draggable v-model="animals" :options="{ group: { name: 'animal', pull: 'clone', put: false }}" class="animal-selector">
      <div v-for="animal in animals" :key="animal.id" :class="{ unfocus: !isSearched(animal) }" class="animal" @click="addAnimal(animal)">
        <div :style="{'background-image': `url(${animal.imageUrl})`}" :title="animal.name" class="animal-icon" />
      </div>
    </draggable>

    <div v-if="!zoo" class="loader-ring"><div/><div/><div/><div/></div>
    <div v-else class="enclosure-container">
      <div v-for="enclosure in zoo.enclosures" :key="enclosure.id" :class="{ focus: focusedEnclosureId && focusedEnclosureId === enclosure.id }" class="enclosure" @click="focusEnclosure(enclosure)">
        <input v-model="enclosure.name" :placeholder="`Enclos ${enclosure.id}`" :ref="`enclosure-${enclosure.id}`" class="enclosure-name" @change="editEnclosure(enclosure)">
        <icon :icon="['far', 'trash-alt']" class="delete-icon" @click="deleteEnclosure(enclosure)"/>

        <draggable v-model="enclosure.animals" :options="{ group: 'animal' }" class="animal-container">
          <div v-for="animal in enclosure.animals" :key="animal.id" :class="{ unfocus: !isSearched(animal) }" class="animal" @click="removeAnimal(animal, enclosure)">
            <icon :icon="['fal', 'ban']" class="ban-icon" />
            <div :style="{'background-image': `url(${animal.imageUrl})`}" :title="animal.name" class="animal-icon" />
          </div>
        </draggable>

        <div class="data-container">
          <span v-if="search.length > 0">{{ enclosure.animals.filter(animal => isSearched(animal)).length }} / </span>
          <span>{{ enclosure.animals.length }} {{ enclosure.animals.length &lt;= 1 ? 'animal' : 'animaux' }}</span>
          <span> | </span>
        </div>
      </div>

      <div class="button-container">
        <div class="new-enclosure enclosure" @click="createEnclosure">
          <div class="add-icon">+</div>
          <div class="text">
            Créer un nouvel enclos
          </div>
        </div>

        <div v-if="zoo.enclosures" class="zoo-data enclosure">
          <div class="title">
            Informations sur le zoo
          </div>
          <div class="data">
            {{ zoo.enclosures.length }} enclos
          </div>
          <div class="data">
            {{ zooAnimals.length }} {{ zooAnimals.length &lt;= 1 ? 'animal' : 'animaux' }}
          </div>
          <div class="data">
            {{ zooAnimals.filter(animal => isSearched(animal)).length }} {{ zooAnimals.filter(animal => isSearched(animal)).length &lt;= 1 ? 'animal trouvé' : 'animaux trouvés' }}
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import uuidv1 from 'uuid/v1';

import draggable from 'vuedraggable';
import Topbar from '~/components/Topbar.vue';

export default Vue.extend({
  components: {
    draggable,
    Topbar
  },
  data() {
    return {
      zoo: null,
      animals: [],
      focusedEnclosureId: null
    };
  },
  computed: {
    search() { return this.$store.state.Zoos.search; },
    zooAnimals() {
      return this.zoo.enclosures.reduce((acc, enclosure) => acc.concat(enclosure.animals), []);
    },
    focusedEnclosure() {
      return this.zoo.enclosures.find((enclosure) => { return enclosure.id === this.focusedEnclosureId; });
    }
  },
  created() {
    if (this.$route.params.zoo) {
      this.initZoo(this.$route.params.zoo);
      this.initAnimals();
    } else {
      this.$router.push({ name: 'index' });
    }
  },
  methods: {
    initZoo(zooId) {
      this.$store.dispatch('Zoos/getZoo', zooId).then((response) => {
        this.zoo = response;
      });
    },
    initAnimals() {
      this.$store.dispatch('Animals/getAnimals').then((response) => {
        this.animals = response;
      });
    },
    createEnclosure() {
      this.$store.dispatch('Zoos/createEnclosure', { zooId: this.zoo.id, name: '' }).then((response) => {
        this.zoo = response;
        this.focusEnclosure(response.enclosures[response.enclosures.length - 1]);
      });
    },
    editEnclosure(enclosure) {
      this.$store.dispatch('Zoos/editEnclosure', { zooId: this.zoo.id, enclosure: enclosure }).then((response) => {
        this.zoo = response;
      });
    },
    deleteEnclosure(enclosure) {
      this.$store.dispatch('Zoos/deleteEnclosure', { zooId: this.zoo.id, enclosure: enclosure }).then((response) => {
        this.zoo = response;
      });
    },
    addAnimal(animalModel) {
      if (!this.focusedEnclosureId) { return; }

      this.$store.dispatch('Zoos/addAnimal', { zooId: this.zoo.id, enclosure: this.focusedEnclosure, animal: animalModel }).then((response) => {
        this.zoo = response;
        this.focusEnclosure(response.enclosures[response.enclosures.length - 1]);
      });
    },
    removeAnimal(animal, enclosure) {
      this.$store.dispatch('Zoos/deleteAnimal', { zooId: this.zoo.id, enclosure: this.focusedEnclosure, animal: animal }).then((response) => {
        this.zoo = response;
      });
    },
    focusEnclosure(enclosure) {
      this.focusedEnclosureId = enclosure.id;
    },
    isSearched(animal) {
      return animal.name.toLowerCase().trim().includes(this.search.toLowerCase().trim());
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
    overflow-y: auto;

    .animal {
      display: flex;
      position: relative;
      $size: 48px;
      width: $size;
      height: $size;
      margin: 0;
      border-radius: 4px;
      cursor: pointer;

      &.unfocus {
        opacity: 0.2;
      }

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

      .delete-icon {
        position: absolute;
        top: 4px;
        right: 12px;
        padding: 4px;
        height: 24px;
        width: 24px;
        border: solid 2px transparent;
        border-radius: 24px;
        color: $red-color;
        box-sizing: border-box;
        cursor: pointer;
        transition: 0.4s $easeOutSine;

        &:hover {
          border-color: $red-color;
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

          &.unfocus {
            opacity: 0.2;
          }

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

    .new-enclosure, .zoo-data {
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

      .title {
        width: 100%;
        padding: 4px 12px;
        text-align: center;
        font-weight: bold;
        border-bottom: solid 1px #d0d0d0;
      }

      .data {
        width: 100%;
        padding: 2px 12px;
        text-align: left;
        box-sizing: border-box;
      }
    }
  }
}
</style>
