import { useStore } from "vuex";
export function useEventAsset(src) {
  const store = useStore();

  const resolveAssetUrl = () => {
    const data = store.getters["events/getEventData"];

    return `${import.meta.env.VITE_AWS_URL}${data.id}-${data.event_link}/${
      src.split(".")[0]
    }.m3u8`;
  };

  return {
    resolveAssetUrl,
  };
}
