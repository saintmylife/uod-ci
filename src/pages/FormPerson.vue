<template>
  <b-container
    fluid
    class="position-relative p-0 b-0 overflow-hidden h-100 d-flex justify-content-center align-items-center"
    v-cloak
  >
    <video-player-bg
      v-if="Object.keys(this.computedFormPersonAssets).length !== 0"
      :options="computedFormPersonAssets"
    />
    <div class="text-light overflow-hidden py-2">
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form
          @submit.prevent="handleSubmit(formPersonSubmit)"
          aria-autocomplete="off"
          autocomplete="off"
        >
          <div class="container-fluid d-flex flex-column">
            <!-- <p
              class="bg-dark rounded-top text-center font-weight-bold py-1 m-0 text-center guest-info-title"
            >
              Data Anda
            </p>
            <guest-data
              ref="guestForm"
              :guestData="getGuests"
              :personInput="getInputPersons"
            /> -->
            <div class="bg-dark rounded-top mt-4">
              <small
                class="m-0 py-1 form-text text-center text-white font-italic"
                >Pilih Sesi Kehadiran Anda
              </small>
            </div>
            <guest-form v-model="guestFormInput" />
            <template v-if="getInputPersons !== 0 && personForm">
              <div class="bg-dark rounded-top mt-4">
                <small
                  class="m-0 py-1 form-text text-center text-white font-italic"
                >
                  Data Orang Yang Hadir Bersama Anda
                </small>
              </div>
              <div
                class="bg-transparent rounded-bottom pt-3 px-2 container-form-person"
              >
                <person-form
                  v-for="(person, index) in getInputPersons - 1"
                  :key="index"
                  :personIndex="index"
                  :nameValue="personFormInput.name"
                  :phoneValue="personFormInput.phone"
                />
              </div>
            </template>
            <button
              type="submit"
              class="btn btn-labeled border-0 btn-success mt-3 align-self-end"
            >
              <span class="btn-label p-1 p-sm-2"
                ><b-icon icon="check-circle-fill" scale=".7"
              /></span>
              KIRIM
            </button>
          </div>
        </b-form>
      </ValidationObserver>
    </div>
    <confirm :guestInput="guestFormInput" />
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const guestConfirmation = parseInt(
        await vm.$store.getters.getGuests.confirmation.confirmation
      );
      if (guestConfirmation === 1 && from.name === "Summary") {
        next({
          name: "Invitation",
          params: { guestSlug: vm.$route.params.guestSlug },
        });
      } else if (guestConfirmation === 1 && from.name === "Invitation") {
        next({
          name: "Summary",
          params: { guestSlug: vm.$route.params.guestSlug },
        });
      } else {
        next(to);
      }
    });
  },
  beforeMount() {
    this.computedPersonInput = this.getInputPersons;
    this.computedFormPersonAssets = this.findEventAssetRole("rsvp-form");
    this.guest = this.getGuests;
    this.personForm = parseInt(this.getEventOption("rsvp-form-guest").value);
  },
  components: {
    Confirm: () => import("@/components/FormPerson/Confirm.vue"),
    GuestData: () => import("@/components/FormPerson/GuestData.vue"),
    GuestForm: () => import("@/components/FormPerson/GuestForm.vue"),
    PersonForm: () => import("@/components/FormPerson/PersonForm.vue"),
    VideoPlayerBg: () => import("@/components/VideoPlayerBg.vue"),
  },
  data: () => ({
    personForm: true,
    formPersonAssets: {},
    personInput: null,
    guest: {},
    guestFormInput: "",
    personFormInput: {
      name: [],
      phone: [],
    },
  }),
  computed: {
    ...mapGetters([
      "getEvents",
      "getEventOption",
      "getGuests",
      "getInputPersons",
      "findEventAssetRole",
    ]),
    computedPersonInput: {
      get: function() {
        return this.personInput;
      },
      set: function(value) {
        this.personInput = value;
      },
    },
    computedFormPersonAssets: {
      get: function() {
        return this.formPersonAssets;
      },
      set: function(value) {
        this.formPersonAssets = value;
      },
    },
  },
  methods: {
    formPersonSubmit() {
      this.$bvModal.show("formConfirm");
    },
  },
  async mounted() {},
};
</script>
<style scoped>
.container-form-person {
  max-height: 225px;
  overflow-y: auto;
  padding-top: 5px;
  box-shadow: inset 0 0 50px rgba(18, 18, 18, 0.5);
}
</style>
