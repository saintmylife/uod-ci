<template>
  <div
    class="modal fade"
    ref="inputPersonModalContent"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered text-center">
      <div class="modal-content overflow-hidden" style="border-radius: 1rem">
        <div class="modal-title mt-4">
          <small class="text-center noselect"
            ><b>Tekan Gambar Berikut</b>,<br />Lalu Pilih Simpan Untuk
            Mengunduh</small
          >
        </div>
        <div class="modal-body">
          <img :src="getQrImage" class="w-50 shadow border border-dark" />
        </div>
        <div
          @click="hideInputPersonModal()"
          class="position-absolute btn-close-modal-person"
        >
          X
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  emits: ["closeDownloadModal"],
  computed: {
    ...mapGetters(["getQrImage"]),
    getImage() {
      return this.image;
    },
  },
  methods: {
    showInputPersonModal() {
      this.$refs.inputPersonModalContent.style.display = "block";
      this.$refs.inputPersonModalContent.classList.add("show");
    },
    hideInputPersonModal() {
      this.$refs.inputPersonModalContent.style.display = "none";
      this.$refs.inputPersonModalContent.classList.remove("show");
      this.$emit("closeDownloadModal");
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 20rem !important;
}
.btn-close-modal-person {
  top: 0;
  right: 0px;
  background-color: #343a40;
  color: #f8f9fa;
  font-weight: 800;
  padding: 7px 15px;
  box-sizing: border-box;
  border-bottom-left-radius: 15px;
}
</style>
