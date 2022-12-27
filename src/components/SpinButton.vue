<template>
  <div
    role="group"
    lang="en-US"
    tabindex="-1"
    class="b-form-spinbutton form-control d-flex align-items-stretch w-50 mx-auto"
  >
    <button
      tabindex="-1"
      type="button"
      aria-controls="demo-sb"
      aria-label="Decrement"
      aria-keyshortcuts="ArrowDown"
      class="btn btn-sm border-0 rounded-0 py-0"
      :disabled="props.modelValue == 1"
      @click="counter(false)"
    >
      <svg
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        focusable="false"
        role="img"
        aria-label="dash"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi-dash b-icon bi"
      >
        <g transform="translate(8 8) scale(1.25 1.25) translate(-8 -8)">
          <path
            d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
          ></path>
        </g>
      </svg>
    </button>
    <output
      dir="ltr"
      id="demo-sb"
      role="spinbutton"
      tabindex="0"
      aria-live="off"
      aria-valuemin="1"
      aria-valuemax="1"
      aria-valuenow="1"
      aria-valuetext="1"
      class="flex-grow-1 align-self-center border-left border-right"
      ><h5 class="m-0">{{ props.modelValue }}</h5></output
    ><button
      tabindex="-1"
      type="button"
      aria-controls="demo-sb"
      aria-label="Increment"
      aria-keyshortcuts="ArrowUp"
      class="btn btn-sm border-0 rounded-0 py-0"
      :disabled="props.modelValue == props.maxPerson"
      @click="counter(true)"
    >
      <svg
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        focusable="false"
        role="img"
        aria-label="plus"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi-plus b-icon bi"
      >
        <g transform="translate(8 8) scale(1.25 1.25) translate(-8 -8)">
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          ></path>
        </g>
      </svg>
    </button>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const props = defineProps({
  modelValue: Number,
  maxPerson: Number,
});
const emit = defineEmits(["update:modelValue"]);
const isDisabled = reactive({
  min: false,
  plus: false,
});
const counter = (value) => {
  if (value) {
    emit("update:modelValue", props.modelValue + 1);
  } else {
    emit("update:modelValue", props.modelValue - 1);
  }
};
</script>
<style>
.b-form-spinbutton {
  text-align: center;
  overflow: hidden;
  background-image: none;
  padding: 0;
}
</style>
