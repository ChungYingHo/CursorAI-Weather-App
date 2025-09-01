<template>
  <div class="weather-map">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useWeatherStore } from '@/stores/weather'

const props = defineProps<{
  lat?: number
  lon?: number
  cityName?: string
}>()

const weatherStore = useWeatherStore()
const mapContainer = ref<HTMLElement>()
let map: L.Map | null = null
let marker: L.Marker | null = null

// Fix for Leaflet marker icons in Vite
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

const initMap = () => {
  if (!mapContainer.value) return

  fixLeafletIcons()

  map = L.map(mapContainer.value).setView([23.5, 121], 7) // Default to Taiwan

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Add weather layer
  L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY'}`, {
    attribution: '© OpenWeatherMap'
  }).addTo(map)
}

const updateMarker = () => {
  if (!map || !props.lat || !props.lon) return

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker)
  }

  // Add new marker
  marker = L.marker([props.lat, props.lon])
    .addTo(map)
    .bindPopup(props.cityName || 'Unknown Location')

  // Center map on marker
  map.setView([props.lat, props.lon], 10)
}

const updateMap = () => {
  if (props.lat && props.lon) {
    updateMarker()
  }
}

onMounted(() => {
  initMap()
  updateMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

watch(() => [props.lat, props.lon, props.cityName], updateMap)
</script>

<style scoped>
.weather-map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map-container {
  width: 100%;
  height: 100%;
}
</style> 