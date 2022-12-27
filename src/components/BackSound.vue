<template>
  <div
    @click="audioState = !audioState"
    v-if="!isAudioEmpty"
    class="position-absolute audio-wrapper"
    data-html2canvas-ignore
  >
    <transition name="fade" mode="out-in">
      <svg
        v-if="audioState"
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        focusable="false"
        role="img"
        aria-label="music note beamed"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi-music-note-beamed rounded-circle border border-dark bg-light theme-text-dark p-2 b-icon bi b-icon-animation-spin fade-leave fade-leave-active"
      >
        <g
          data-v-39d59a9b=""
          transform="translate(8 8) scale(0.8 0.8) translate(-8 -8)"
        >
          <path
            d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"
          ></path>
          <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"></path>
          <path
            d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"
          ></path>
        </g>
      </svg>
      <svg
        v-else
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        focusable="false"
        role="img"
        aria-label="icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="b-iconstack border border-dark rounded-circle bg-light p-2 b-icon bi"
      >
        <g data-v-39d59a9b="">
          <svg
            data-v-39d59a9b=""
            viewBox="0 0 16 16"
            fill="currentColor"
            class="bi-volume-off b-icon bi"
          >
            <g data-v-39d59a9b="">
              <g
                data-v-39d59a9b=""
                transform="translate(8 8) scale(1.2 1.2) translate(-8 -8)"
              >
                <path
                  d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM10 5.04L8.312 6.39A.5.5 0 0 1 8 6.5H6v3h2a.5.5 0 0 1 .312.11L10 10.96V5.04z"
                ></path>
              </g>
            </g></svg
          ><svg
            data-v-39d59a9b=""
            viewBox="0 0 16 16"
            fill="currentColor"
            class="bi-slash-circle b-icon bi"
          >
            <g data-v-39d59a9b="">
              <g
                data-v-39d59a9b=""
                transform="translate(8 8) scale(1.5 1.5) translate(-8 -8)"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                ></path>
                <path
                  d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"
                ></path>
              </g>
            </g>
          </svg>
        </g>
      </svg>
    </transition>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onDeactivated } from "vue";
import { useStore } from "vuex";

const store = useStore();
const audioElement = ref(null);
const audioSrc = store.getters["events/getEventData"].audio_mp3;
const isPlaying = ref(true);
const isAudioEmpty = ref(true);

const setAudioSrc = () => {
  if (!audioSrc) {
    return;
  }
  isAudioEmpty.value = false;
  const src = store.getters["events/getAssetUrl"];
  audioElement.value = new Audio(src + audioSrc);
};
setAudioSrc();
const audioState = computed({
  get: function () {
    return isPlaying.value;
  },
  set: function (value) {
    isPlaying.value = value;
    if (value) {
      promiseAudio(audioElement.value.play());
    } else {
      promiseAudio(audioElement.value.pause());
    }
  },
});
const promiseAudio = (promise) => {
  if (promise !== undefined) {
    promise.then(() => {});
  }
};
const onBlur = () => {
  audioState.value = false;
};

onMounted(() => {
  promiseAudio(audioElement.value.play());
  window.addEventListener("blur", onBlur);
  // console.log("sound mounted", audioElement.value.play());
});
</script>
<style scoped>
.audio-wrapper {
  top: 0;
  right: 10px;
  font-size: 3rem;
  z-index: 10;
}
.btn-audio {
  border: none;
  outline: none;
  background: none;
}
.bg-theme {
  color: #e67e22;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 50%);
}
.b-icon.bi {
  display: inline-block;
  overflow: visible;
  vertical-align: -0.15em;
}
.b-icon.b-icon-animation-spin,
.b-icon.b-iconstack .b-icon-animation-spin > g {
  transform-origin: center;
  -webkit-animation: b-icon-animation-spin 2s linear infinite normal;
  animation: b-icon-animation-spin 2s linear infinite normal;
}
@keyframes b-icon-animation-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
