<template>
  <div ref="containerEl" class="container-fluid py-4 h-100 w-100">
    <div class="row justify-content-center align-items-center text-center">
      <div class="col-8">
        <div class="bg-light rounded overflow-hidden shadow p-2">
          <qrcode-vue
            :value="data.guest"
            level="H"
            :size="500"
            class="w-100 h-100"
          />
          <p class="m-0 fw-bold" v-html="data.guest" />
        </div>
      </div>
    </div>
    <div class="mt-5 row justify-content-center align-items-center">
      <div class="col">
        <div class="card bg-transparent border-0 text-center">
          <div class="card-body p-1">
            <div class="card-title">
              <h5>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet,
                asperiores!
              </h5>
            </div>
            <div class="card-subtitle my-2">
              <h6>Senior Backend Developers</h6>
            </div>
            <div class="card-text">
              <small>PK. 10.00 - 13.30 WIB</small>
              <div class="mt-4">
                <div class="row justify-content-center align-items-center">
                  <div
                    class="col-8 border border-dark rounded-3 valid-person-box"
                  >
                    <p
                      class="m-0 p-1 fw-bold text-light valid-person-text text-center"
                    >
                      Berlaku Untuk 2 Orang
                    </p>
                  </div>
                </div>
                <div class="mt-2 row justify-content-center align-items-center">
                  <div class="col-11">
                    <div
                      class="p-1 text-center container border border-dark rounded-3 valid-person-box"
                    >
                      <small
                        class="m-0 fw-bold text-light valid-person-text text-center"
                      >
                        {{
                          !data.isDownload
                            ? "Tidak Menerima Hadiah Dalam Bentuk Apapun"
                            : " Mohon QRCode Dibawa Pada Saat Acara"
                        }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="!data.isDownload"
                class="mt-4 row justify-content-around align-items-center align-content-center"
              >
                <div class="col text-end">
                  <button
                    class="btn btn-labeled border-0 btn-dark"
                    @click="downloadQR()"
                  >
                    <span class="btn-label p-1 p-sm-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-download"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                          d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                        />
                      </svg>
                    </span>
                    UNDUH
                  </button>
                </div>
                <div class="col text-start">
                  <button class="btn btn-labeled border-0 btn-dark">
                    <span class="btn-label p-1 p-sm-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg>
                    </span>
                    LANJUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <download-modal
      ref="downloadModalEl"
      @closeDownloadModal="data.isDownload = false"
    />
  </div>
</template>
<script setup>
// add backround
import QrcodeVue from "qrcode.vue";
import { useStore } from "vuex";
import { reactive, nextTick, ref, onMounted, computed } from "vue";
import html2canvas from "html2canvas";
import { useDevices } from "/src/plugins/deviceDetector";
import DownloadModal from "/src/components/Summary/DownloadModal.vue";

const store = useStore();
const { browser } = useDevices();
const data = reactive({
  guest: "ASD001",
  isDownload: false,
});
const containerEl = ref(null);
const downloadModalEl = ref(null);
const downloadQR = async () => {
  data.isDownload = true;
  await nextTick();
  await html2canvas(containerEl.value, {
    scale: 4,
    useCORS: true,
    allowTaint: false,
  }).then((res) => {
    const base64Src = res.toDataURL("image/jpeg", 1);
    store.commit("setQrImage", base64Src);
    if (browser.chrome) {
      downloadModalEl.value.showInputPersonModal();
    } else {
      const createEl = document.createElement("a");
      createEl.href = base64Src.replace("image/jpeg", "image/octet-stream");
      createEl.download = "Surya-Nur-Ardiansah.jpg";
      createEl.click();
    }
  });
};

onMounted(() => {
  console.log(containerEl.value);
});
</script>
<style scoped>
.valid-person-box {
  background: rgba(18, 18, 18, 0.25);
}
.valid-person-text {
  text-shadow: 1px 1px 5px rgba(18, 18, 18, 0.75);
}
</style>
