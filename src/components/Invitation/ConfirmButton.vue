<template>
  <div class="position-absolute confirm-box-wrapper" ref="confirmBoxWrapper">
    <div class="container-fluid px-0 py-2 container-confirm-box">
      <div v-if="(data.event.id != 291)" class="row text-center mb-2">
        <div class="col">
          <button type="button" class="btn text-light fw-bold" @click="clickLocation()">
            <span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-building" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                <path
                  d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
              </svg></span>{{ getButtonText.location }}
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-around">
          <button class="btn btn-labeled border-0 rounded btn-success" :disabled="confirmClick"
            @click="confirmAttend()">
            <span class="btn-label p-1 p-sm-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check"
                viewBox="0 0 16 16">
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            </span>
            {{ getButtonText.attend }}
          </button>
          <button v-if="data.event.active_ragu" class="btn btn-labeled border-0 btn-warning" :disabled="confirmClick" @click="confirmMaybe()">
            <span class="btn-label p-1 p-sm-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question"
                viewBox="0 0 16 16">
                <path
                  d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
              </svg> </span>{{ getButtonText.maybe }}
          </button>
          <button v-if="data.event.active_decline" class="btn btn-labeled border-0 btn-danger" :disabled="confirmClick" @click="confirmDecline()">
            <span class="btn-label p-1 p-sm-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
                viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg> </span>{{ getButtonText.decline }}
          </button>
        </div>
      </div>
    </div>
    <input-person-modal ref="inputPersonModalBtn" />
  </div>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import InputPersonModal from "./InputPersonModal.vue";
export default {
  components: {
    InputPersonModal,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      guest: [],
      event: []
    });
    const inputPersonModalBtn = ref(null);
    const confirmClick = ref(false);

    data.event = store.getters["events/getEventData"];
    data.guest = store.getters["guests/getGuestData"];

    const getButtonText = computed(
      function () {
        const eventLang = data.event.lang;

        return {
          attend: eventLang == 'id' ? 'HADIR' : 'ATTEND',
          maybe: eventLang == 'id' ? 'RAGU' : 'MAYBE',
          decline: eventLang == 'id' ? 'TIDAK' : 'DECLINE',
          location: eventLang == 'id' ? 'LOKASI' : 'LOCATION'
        }
      }
    );

    const confirmAttend = async () => {
      confirmClick.value = true;
      if (data.guest.kehadiran != 1 && data.guest.max_orang != 1) {
        inputPersonModalBtn.value.showInputPersonModal();
      } else {
        window.location.href = `https://reddonedigital.com/UndanganOnline/callbak_confirmation/${data.event.id}/${data.guest.id}/1/1`
      }
      confirmClick.value = false;
    };

    const confirmMaybe = async () => {
      confirmClick.value = true;
      window.location.href = `https://reddonedigital.com/UndanganOnline/callbak_confirmation/${data.event.id}/${data.guest.id}/2/1`
    };

    const confirmDecline = async () => {
      confirmClick.value = true;
      window.location.href = `https://reddonedigital.com/UndanganOnline/callbak_confirmation/${data.event.id}/${data.guest.id}/3/0`
    };

    const clickLocation = () => {
      window.open(
        String(data.event.maps),
        "_blank",
        "noopener"
      );
    };

    return {
      data,
      confirmClick,
      confirmAttend,
      confirmMaybe,
      confirmDecline,
      clickLocation,
      inputPersonModalBtn,
      getButtonText
    };
  },
};
</script>
<style scoped>
.confirm-box-wrapper {
  bottom: 0;
  /* bottom: -50%; */
  left: 0;
  right: 0;
  z-index: 10;
}
.confirm-box-wrapper-animation {
  animation-name: fadeIn;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}
@keyframes fadeIn {
  from {
    bottom: -50%;
  }
  to {
    bottom: 0;
  }
}
.container-confirm-box {
  background-color: rgba(18, 18, 18, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
