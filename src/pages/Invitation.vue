<template>
  <div class="h-100 w-100">
    <swiper
      :modules="data.swiperModules"
      :navigation="data.swiperOptions.navigation"
      :pagination="data.swiperOptions.pagination"
      @swiper="onSwiper"
      @slideChange="swiperSlideChange"
    >
      <swiper-slide v-for="(content, index) in data.slider" :key="content">
        <video-player
          :ref="videoSlide.el"
          :source="content"
          :slideIndex="index"
        />
        <button v-if="index === 0 && data.event.id === 296" class="invitation-button-layer">PANDUAN</button>
      </swiper-slide>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </swiper>
    <confirm-button />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { ref, reactive, onMounted } from "vue";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import eventBus from "/src/plugins/eventBus";
import ConfirmButton from "/src/components/Invitation/ConfirmButton.vue";
import VideoPlayer from "/src/components/VideoPlayer.vue";
import "swiper/css/bundle";
export default {
  components: {
    ConfirmButton,
    Swiper,
    SwiperSlide,
    VideoPlayer,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      event: {},
      slider: [],
      swiperModules: [Navigation, Pagination],
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
        mousewheel: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      },
      swiperActiveIndex: 0,
    });
    data.slider = store.getters["events/getEventSlider"].map(
      (item) => item.media
    );
    data.event = store.getters["events/getEventData"];
    console.log(data.event);
    const swiperEl = ref(null);
    const onSwiper = (swiper) => {
      swiperEl.value = swiper;
    };
    const videoSlide = ref([]);

    const swiperSlideChange = () => {
      const currentVid = videoSlide.value[swiperEl.value.activeIndex];
      const isPlayed = currentVid.player.hasStarted();
      if (isPlayed) {
        currentVid.player.currentTime(0);
      } else {
        const promise = currentVid.player.play();
        if (promise !== undefined) {
          promise.then(() => {}).catch((err) => console.log(err));
        }
      }
    };
    onMounted(() => {
      videoSlide.value = document.querySelectorAll("video-js");
      eventBus.$emit("active-page", "invitation");
    });
    return {
      data,
      onSwiper,
      videoSlide,
      swiperSlideChange,
    };
  },
};
</script>
<style>
:root {
  --swiper-theme-color: #e67e22;
}
.person-modal-content {
  width: 75%;
  margin: 0 auto;
  border-radius: 20px;
}
.b-form-spinbutton {
  border-color: #343a40;
}
.b-form-spinbutton:nth-child(2) {
  border-color: #f8f9fa;
}
.b-form-spinbutton button {
  background-color: #343a40;
  color: #f8f9fa;
}
@media only screen and (max-width: 320px) {
  .person-modal-title {
    font-size: 1.15rem;
  }
}
.modal-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
<style scoped>
.vjs-tech {
  object-fit: fill;
}
.swiper {
  max-height: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide video {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: #fff;
  border: none;
  height: 100%;
  width: 100%;
  object-fit: fill;
}
.invitation-button-layer {
  position: absolute;
  /* Bottom view ke container paling bawah / height viewport * 100% */
  bottom: 14.75%;
  /* Hasil Bottom - Bottom view ke container paling atas / height viewport * 100% */
  /* height: 6%; */
  padding: 4px 16px;
  text-align: center;
  font-weight: 700;
  color: rgb(28,124,141);
  border: 2px solid rgb(28,124,141);
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}
</style>
