<template>
  <div class="position-relative w-100 h-100">
    <div
      class="d-flex w-100 h-100 justify-content-center align-items-center"
      v-if="isLoading"
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- <div class="spinner-border" v role="status" /> -->
    <video-background
      v-else
      :source="getEventAssetCover"
      @ready="handleVideoStarted"
    />
    <touch-anywhere ref="touchAnywhere" />
    <div class="masking" @click="handleClickCover" />
    <div class="person-name" ref="elPersonName">
      <p class="m-0" v-html="getPersonName" />
    </div>
  </div>
</template>
<script>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import eventBus from "/src/plugins/eventBus";
import VideoBackground from "/src/components/VideoBackground.vue";
import TouchAnywhere from "/src/components/cover/TouchAnywhere.vue";
export default {
  components: {
    VideoBackground,
    TouchAnywhere,
  },
  setup() {
    const isLoading = ref(true);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    if (route.params.event_id == '') {
      route.params.event_id = route.params.guest_id;
      route.params.guest_id = route.params.event_slug;
      route.params.event_slug = '';
    }

    const initData = () => {
      Promise.all([
        store.dispatch("events/fetchEvent", route.params.event_id),
        store.dispatch("events/fetchSlider", route.params.event_id),
        store.dispatch("guests/fetchGuest", {
          event_id: route.params.event_id,
          guest_id: route.params.guest_id,
        }),
      ]).then((res)=> {
        if(res[0].layout_type != 4){
          setTimeout(() => {
          }, 500);
        }
      })
        .catch((err) => {
          console.log(err.response);
          setTimeout(() => {
            router.replace("/error/404");
          }, 500);
        })
        .finally(() => {
          setTimeout(() => {
            isLoading.value = false;
          }, 500);
        });
    };
    const getEventAssetCover = computed(
      () => store.getters["events/getEventData"].img_welcome
    );
    const touchAnywhere = ref(null);
    const handleVideoStarted = () => {
      touchAnywhere.value.fadeIn();
      if (route.params.event_id == 284) {
        togglePersonName();
      }
    };
    const handleClickCover = () => {
      router.push({
        name: "Invitation",
        params: {
          guest_slug: route.params.guest_slug,
          event_slug: route.params.event_slug != '' ? route.params.event_slug : store.getters['events/getEventData'].event_link,
          guest_id: route.params.guest_id,
          event_id: route.params.event_id,
        },
      });
    };

    const elPersonName = ref(null);
    const togglePersonName = () => {
      elPersonName.value.classList.add('person-name-animated')
    }
    const getPersonName = computed(
      () => store.getters["guests/getGuestData"].nama
    );

    (() => {
      initData();
    })();

    onMounted(() => {
      eventBus.$emit("active-page", "cover");
    });

    return {
      isLoading,
      getEventAssetCover,
      touchAnywhere,
      handleVideoStarted,
      handleClickCover,
      route,
      elPersonName,
      getPersonName
    };
  },
};
</script>
<style scoped>
.masking {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.person-name {
  position: absolute;
  /* Bottom view ke container paling bawah / height viewport * 100% */
  bottom: 24.7%;
  /* Hasil Bottom - Bottom view ke container paling atas / height viewport * 100% */
  height: 8.48%;
  left: 28%;
  right: 28%;
  /* padding: 4px; */
  text-align: center;
  font-weight: 700;
  position: absolute;
  border: 2px solid rgb(228,160,108);
  border-radius: 1rem;
  opacity: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.person-name-animated {
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}
</style>
