<template>
  <div class="VueToNuxtLogo">
    <div class="Triangle Triangle--one"/>
    <div class="Triangle Triangle--two"/>
    <div class="Triangle Triangle--three"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

<style lang="scss" scoped>
.VueToNuxtLogo
{
  display: inline-block;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
}
.Triangle
{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}
.Triangle--one
{
  border-left: 105px solid transparent;
  border-right: 105px solid transparent;
  border-bottom: 180px solid #41B883;
}
.Triangle--two
{
  top: 60px;
  left: 35px;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-bottom: 120px solid #35495E;
}
.Triangle--three
{
  top: 120px;
  left: 70px;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 60px solid #fff;
}
</style>
