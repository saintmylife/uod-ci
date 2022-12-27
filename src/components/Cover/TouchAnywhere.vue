<template>
  <button
    ref="invitationBtn"
    class="btn btn-dark position-absolute invitation-open theme-bg-dark"
  >
    {{ store.getters['events/getEventData'].lang == 'id' ? 'Buka Undangan' : 'Open Invitation'}}
  </button>
</template>
<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    const invitationBtn = ref(null);
    const store = useStore();
    const fadeIn = () => {
      invitationBtn.value.classList.add("invitation-btn-animation");
    };

    return {
      invitationBtn,
      fadeIn,
      store
    };
  },
};
</script>
<style scoped>
.invitation-btn-animation {
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}
.invitation-open {
  color: white;
  bottom: 15%;
  right: -50%;
  font-weight: 700;
  border-top-left-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 0;
  box-shadow: 10px 5px 10px rgb(0 0 0 / 50%);
}
@keyframes fadeIn {
  from {
    right: -50%;
  }
  to {
    right: 0;
  }
}
path.three {
  animation: color_anim 1.5s infinite 0.2s;
}

path.one {
  transform: translateX(0%);
  animation: color_anim 1.5s infinite 0.6s;
}

path.two {
  transform: translateX(0%);
  animation: color_anim 1.5s infinite 0.4s;
}

/* SVG animations */

@keyframes color_anim {
  0% {
    fill: white;
  }
  50% {
    fill: #e67e22;
  }
  100% {
    fill: white;
  }
}
</style>
