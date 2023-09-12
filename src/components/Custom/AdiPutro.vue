<template>
  <video-js ref="videoPlayer" class="video-js-bg video-js vjs-fill">
    <source :src="resolveAssetUrl()" type="application/x-mpegURL" />
  </video-js>
  <div class="text-light">
    <h6 class="m-0 p-0">PROGRAM CSR ADI PUTRO</h6>
    <button class="btn btn-adiputro my-3" @click="handleClickGuide"><b>CSR ADI PUTRO</b></button>
    <div>
        <h6>Media Sosial Kami:</h6>
        <div class="d-flex" style="justify-content: space-evenly;">
            <a href="https://adiputrogroup.com" target="_blank" noopener>
                <img style="width:18px" src="/adiputro/web.png" alt="">
            </a>
            <a href="https://www.instagram.com/adiputro_official" target="_blank" noopener>
                <img style="width:18px" src="/adiputro/ig.png" alt="">
            </a>
            <a href="https://www.facebook.com/adiputroofficial" target="_blank" noopener>
                <img style="width:18px" src="/adiputro/fb.png" alt="">
            </a>
            <a href="https://www.youtube.com/@AdiPutroOfficial" target="_blank" noopener>
                <img style="width:18px" src="/adiputro/yt.png" alt="">
            </a>
        </div>
    </div>
  </div>
</template>

<script setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ref, onMounted, computed } from "vue";
import { useEventAsset } from "/src/helpers/eventAsset";

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  slideIndex: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["ready"]);
const { resolveAssetUrl } = useEventAsset(props.source);
const player = ref(null);
const videoPlayer = ref(null);

const readyAndPlay = () => {
  const promise = player.value.play();
  if (promise !== undefined) {
    promise
      .then(() => {
        if (player.value.hasStarted()) {
          setTimeout(() => {
            // console.log("started");
            // emit("ready", true);
          }, 500);
        }
      })
      .catch((err) => console.log(err));
  }
};
const swiperActive = () => {
  setTimeout(() => {
    if (!player.value.hasStarted()) {
      player.value.ready(() => {
        readyAndPlay();
      });
    } else {
      if (player.value.error()) {
        player.value.reset();
        readyAndPlay();
      }
    }
  }, 500);
};
onMounted(() => {
  player.value = videojs(videoPlayer.value, {
    html5: {
      vhs: {
        overrideNative: true,
      },
      useDevicePixelRatio: true,
      bandwidth: 500,
      nativeAudioTracks: false,
      nativeVideoTracks: false,
    },
    muted: true,
    playsinline: true,
    loop: true,
  });

  if (props.slideIndex === 0) {
    swiperActive();
  }
});
</script>
<style scoped>
.video-js-bg {
  position: absolute !important;
  z-index: -1;
}
.vjs-tech {
  object-fit: fill;
}

.btn-adiputro {
  background-image: url("/adiputro/button.jpg");
  background-size: 100% 100%;
  border-radius: 3rem;
}
</style>
