<template>
  <div class="current-weather">
    <div v-if="currentWeather" class="weather-main-ui">
      <div class="weather-hero">
        <img :src="getWeatherIcon(currentWeather.weather[0].icon)" class="weather-hero-img" alt="weather hero" />
      </div>
      <div class="current-temp">{{ Math.round(currentWeather.main.temp) }}{{ temperatureSymbol }}</div>
      <div class="weather-desc">{{ currentWeather.weather[0].description }}</div>
      <div class="rain-chance">
        <span class="rain-icon">🌧️</span>
        <span>降雨機率 {{ getRainChance(currentWeather) }}%</span>
      </div>
      <div class="city-name">{{ currentWeather.name }}</div>
    </div>
    <div v-else-if="loading" class="loading-container">
      <div class="loading-spinner large"></div>
      <p>載入天氣資料中...</p>
    </div>
    <div v-else class="empty-state">
      <div class="empty-icon">🌤️</div>
      <h3>歡迎使用天氣應用程式</h3>
      <p>請搜尋城市名稱來查看天氣資訊</p>
    </div>
    <div class="weather-photo">
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="city landscape" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
const currentWeather = computed(() => weatherStore.currentWeather)
const loading = computed(() => weatherStore.loading)
const temperatureSymbol = computed(() => weatherStore.temperatureSymbol)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWeatherIcon = (iconCode: any) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRainChance = (weather: any) => {
  if (weather.pop !== undefined) return Math.round(weather.pop * 100)
  if (weather.rain && weather.rain["1h"]) return 100
  return 30
}
</script>

<style scoped>
.current-weather {
  background: white;
  border-radius: 12px;
  padding: 32px 24px 0 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 480px;
  gap: 8px;
}
.weather-hero {
  margin-bottom: 16px;
}
.weather-hero-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
.current-temp {
  font-size: 4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}
.weather-desc {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 8px;
}
.rain-chance {
  font-size: 1rem;
  color: #118ab2;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.city-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
}
.weather-photo {
  width: calc(100% - 24px);
  margin: 24px 0 16px 0;
  align-self: center;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.weather-photo img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}
</style>
