<template>
    <div class="invitation-button-layer w-100" v-if="swiperIndex === 2">
        <div class="container text-center">
            <div class="row mb-2">
                <div class="col">
                    <button class="btn btn-labeled rounded btn-success" @click="handleClickGuide">
                        <span class="btn-label p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-question" viewBox="0 0 16 16">
                                <path
                                    d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                            </svg>
                        </span>
                        PANDUAN
                    </button>
                </div>
                <div class="col">
                    <button class="btn btn-labeled rounded btn-warning" @click="handleClickLayout">
                        <span class="btn-label p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-columns" viewBox="0 0 16 16">
                                <path
                                    d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z" />
                            </svg>
                        </span>
                        LAYOUT
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-labeled rounded btn-primary" style="padding: 0 26px" @click="handleClickZoom">
                        <span class="btn-label p-1" style="left:-26px">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-camera-video-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
                            </svg>
                        </span>
                        ZOOM
                    </button>
                </div>
                <div class="col">
                    <button class="btn btn-labeled rounded btn-danger" style="padding:0 19px" @click="handleClickVideo">
                        <span class="btn-label p-1" style="left:-19px">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-play-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                            </svg>
                        </span>
                        VIDEO
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { toRef } from 'vue';

export default {
    props: {
        event: Object,
        swiperIndex: Number,
    },
    setup (props) {
        const event = toRef(props, 'event');
        const swiperIndex = toRef(props, 'swiperIndex');

        const handleClickGuide = () => {
            window.open(
                `https://reddonedigital.com/Temp/downloadMedia/Lihat-Panduan`,
                "_blank",
                "noopener"
            );
        }

        const handleClickLayout = () => {
            window.open(
                `https://reddonedigital.com/Temp/downloadMedia/Download-Layout`,
                "_blank",
                "noopener"
            );
        }

        const handleClickZoom = () => {
            window.open(
                `https://zoom.us`,
                "_blank",
                "noopener"
            );
        }

        const handleClickVideo = () => {
            window.open(
                `https://youtube.com`,
                "_blank",
                "noopener"
            );
        }

        return {
            event,
            swiperIndex,
            handleClickGuide,
            handleClickLayout,
            handleClickZoom,
            handleClickVideo,
        }
    }
}
</script>

<style scoped>
.invitation-button-layer {
    animation: fadeIn 1s forwards;
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