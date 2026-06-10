export const useSettingsStore = defineStore('settings', () => {
  const hiddenLines = ref<string[]>([])

  const initialMapCenter = ref({
    lat: 41.01354203681039,
    lng: 28.969362785019918,
  })

  const initialMapZoom = ref(10)
  const showTraffic = ref(false)
  const hideMap = ref(false)

  return {
    initialMapCenter,
    initialMapZoom,
    hiddenLines,
    showTraffic,
    hideMap,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
})
