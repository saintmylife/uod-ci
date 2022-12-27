<template>
  <div id="app-container" class="shadow-lg position-relative overflow-hidden">
    <back-sound v-if="audioShow" ref="audioElement" />
    <router-view v-slot="{ Component }">
      <!-- <transition name="scale-slide"> -->
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </div>
</template>
<script setup>
import BackSound from "/src/components/BackSound.vue";
import eventBus from "/src/plugins/eventBus";
import { ref } from "vue";
const audioShow = ref(false);
const audioElement = ref(null);

eventBus.$on("active-page", (page) => {
  if (page != "cover") {
    audioShow.value = true;
  } else {
    audioShow.value = false;
  }
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app-container {
  max-width: 420px !important;
  /* background-color: green; */
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
</style>
