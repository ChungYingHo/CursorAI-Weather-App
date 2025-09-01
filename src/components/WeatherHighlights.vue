<template>
  <div class="highlights-section">
    <h3 class="section-title">今日重點</h3>
    <div class="highlights-grid">
      <div class="highlight-card">
        <div class="highlight-title">紫外線指數</div>
        <div class="highlight-value">{{ uvIndex }}</div>
        <div class="highlight-desc">{{ uvDescription }}</div>
      </div>
      <div class="highlight-card">
        <div class="highlight-title">風速狀態</div>
        <div class="highlight-value">{{ windSpeed }} {{ windSpeedUnit }}</div>
        <div class="highlight-desc">{{ windDirection }}</div>
      </div>
      <div class="highlight-card">
        <div class="highlight-title">日出日落</div>
        <div class="highlight-sun">
          <span>🌅 {{ sunriseTime }}</span>
          <span>🌇 {{ sunsetTime }}</span>
        </div>
      </div>
      <div class="highlight-card">
        <div class="highlight-title">濕度</div>
        <div class="highlight-value">{{ humidity }}%</div>
        <div class="highlight-desc">{{ humidityDescription }}</div>
      </div>
      <div class="highlight-card">
        <div class="highlight-title">能見度</div>
        <div class="highlight-value">{{ visibility }} km</div>
        <div class="highlight-desc">{{ visibilityDescription }}</div>
      </div>
      <div class="highlight-card">
        <div class="highlight-title">空氣品質</div>
        <div class="highlight-value">{{ airQuality }}</div>
        <div class="highlight-desc">{{ airQualityDescription }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const currentWeather = computed(() => weatherStore.currentWeather)
const windSpeedUnit = computed(() => weatherStore.windSpeedUnit)

// UV Index (假資料，因為 OpenWeatherMap 免費版不提供 UV 資料)
const uvIndex = computed(() => currentWeather.value ? '5' : '--')
const uvDescription = computed(() => '中等')

// Wind
const windSpeed = computed(() => currentWeather.value ? currentWeather.value.wind.speed : '--')
const windDirection = computed(() => {
  if (!currentWeather.value) return '--'
  const deg = currentWeather.value.wind.deg
  const directions = ['北', '北北東', '東北', '東北東', '東', '東南東', '東南', '南南東', '南', '南南西', '西南', '西南西', '西', '西北西', '西北', '北北西']
  const index = Math.round(deg / 22.5) % 16
  return directions[index]
})

// Sunrise & Sunset
const sunriseTime = computed(() => {
  if (!currentWeather.value) return '--'
  const date = new Date(currentWeather.value.sys.sunrise * 1000)
  return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })
})

const sunsetTime = computed(() => {
  if (!currentWeather.value) return '--'
  const date = new Date(currentWeather.value.sys.sunset * 1000)
  return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })
})

// Humidity
const humidity = computed(() => currentWeather.value ? currentWeather.value.main.humidity : '--')
const humidityDescription = computed(() => {
  const h = currentWeather.value?.main.humidity
  if (!h) return '--'
  if (h < 30) return '偏低 😰'
  if (h < 60) return '正常 👍'
  return '偏高 😓'
})

// Visibility
const visibility = computed(() => {
  if (!currentWeather.value) return '--'
  return (currentWeather.value.visibility / 1000).toFixed(1)
})

const visibilityDescription = computed(() => {
  const v = currentWeather.value?.visibility
  if (!v) return '--'
  const km = v / 1000
  if (km < 5) return '不佳 😟'
  if (km < 10) return '普通 😐'
  return '良好 😊'
})

// Air Quality (假資料，因為 OpenWeatherMap 免費版不提供空氣品質資料)
const airQuality = computed(() => currentWeather.value ? '105' : '--')
const airQualityDescription = computed(() => '不健康 👎')
</script>

<style scoped>
.highlights-section {
  margin-top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  flex: 1;
  align-content: start;
}

.highlight-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 20px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100px;
}

.highlight-title {
  font-size: 1rem;
  color: #888;
  margin-bottom: 12px;
  font-weight: 500;
}

.highlight-value {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
}

.highlight-desc, .highlight-sun {
  font-size: 0.9rem;
  color: #666;
}

.highlight-sun {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 768px) {
  .highlights-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  
  .highlight-card {
    padding: 16px 12px 12px 12px;
    min-height: 80px;
  }
  
  .highlight-value {
    font-size: 1.6rem;
  }
}
</style>