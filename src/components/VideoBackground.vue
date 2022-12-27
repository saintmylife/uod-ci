<template>
  <video-js ref="videoPlayer" class="video-js-bg video-js vjs-fill">
    <source :src="resolveAssetUrl()" type="application/x-mpegURL" />
  </video-js>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { toRefs, ref, onMounted } from "vue";
import { useEventAsset } from "/src/helpers/eventAsset";
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { source } = toRefs(props);
    const { resolveAssetUrl } = useEventAsset(source.value);
    const player = ref(null);
    const videoPlayer = ref(null);
    
    const readyAndPlay = (video) => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (video.hasStarted()) {
              setTimeout(() => {
                emit("ready", true);
              }, 500);
            }
          })
          .catch((err) => console.log(err));
      }
    };

    onMounted(() => {
      const videoJsPlayer = videojs(videoPlayer.value, {
        html5: {
          vhs: {
            overrideNative: true,
          },
          bandwidth: 500,
          nativeAudioTracks: false,
          nativeVideoTracks: false,
        },
        useDevicePixelRatio: true,
        muted: true,
        playsinline: true,
        loop: true,
      });
      readyAndPlay(videoJsPlayer);
    });

    return {
      resolveAssetUrl,
      player,
      videoPlayer,
    };
  },
};
</script>
<style scoped>
.video-js-bg {
  position: absolute !important;
  z-index: -1;
}
.vjs-tech {
  object-fit: fill;
}
</style>
