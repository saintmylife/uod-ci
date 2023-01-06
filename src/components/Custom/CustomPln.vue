<template>
    <button v-if="swiperIndex === 0" class="btn text-light invitation-button-layer" @click="handleClickGuide">
        RUNDOWN
    </button>
    <div v-if="swiperIndex === 1" style="width:100%;height:250px;padding:24px;position:relative">
        <div style="position:absolute;z-index:99;height:100%;width:100%" @click="handleYoutubeClick" />
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/sSc2vcH6cBM" title="YouTube video player"
            frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"></iframe>
    </div>
</template>

<script>
import { toRef } from 'vue';

export default {
    props: {
        event: Object,
        swiperIndex: {
            required: true,
            type: Number,
        },
    },
    setup (props) {
        const event = toRef(props, 'event');
        const swiperIndex = toRef(props, 'swiperIndex');

        const handleClickGuide = () => {
            window.open(
                `https://reddonedigital.com/Gambar/event/OpeningBulanK3Nasional2023/Rundown.jpg`,
                "_blank",
                "noopener"
            );
        }

        const handleYoutubeClick = () => {
            window.open(
                `https://youtu.be/sSc2vcH6cBM`,
                "_blank",
                "noopener"
            );
        }

        return {
            event,
            swiperIndex,
            handleClickGuide,
            handleYoutubeClick,
        }
    }
}
</script>

<style scoped>
.invitation-button-layer {
    text-align: center;
    font-weight: 700;
    color: rgb(28, 124, 141);
    border: 2px solid rgb(28, 124, 141);
    background: #02abe9;
    animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        bottom: -14.75%;
    }

    100% {
        opacity: 100;
        bottom: 14.75%;
    }
}

@media (min-width: 600px) {
    @keyframes fadeIn {
        0% {
            opacity: 0;
            bottom: -16%;
        }

        100% {
            opacity: 100;
            bottom: 16%;
        }
    }
}
</style>