<template>
  <div class="weather-forecast">
    <div class="forecast-header">
      <h3 class="forecast-title">天氣預報</h3>
    </div>
    
    <div class="forecast-container">
      <div 
        v-for="day in forecastDays" 
        :key="day.dt" 
        class="forecast-day"
      >
        <div class="day-info">
          <div class="day-name">{{ formatDay(day.dt) }}</div>
        </div>
        
        <div class="weather-icon">
          <img 
            :src="getWeatherIcon(day.weather[0].icon)" 
            :alt="day.weather[0].description"
            class="weather-img"
          />
        </div>
        
        <div class="weather-details">
          <div class="temperature">
            <span class="temp-max">{{ Math.round(day.temp.max) }}{{ temperatureSymbol }}</span>
            <span class="temp-min">{{ Math.round(day.temp.min) }}{{ temperatureSymbol }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const forecastDays = computed(() => {
  return weatherStore.forecast?.daily?.slice(0, 5) || []
})

const temperatureSymbol = computed(() => weatherStore.temperatureSymbol)
const windSpeedUnit = computed(() => weatherStore.windSpeedUnit)

const formatDay = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) {
    return '今天'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return '明天'
  } else {
    const days = ['日', '一', '二', '三', '四', '五', '六']
    return `週${days[date.getDay()]}`
  }
}

const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
</script>

<style scoped>
.weather-forecast {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.forecast-header {
  margin-bottom: 20px;
  flex-shrink: 0;
}

.forecast-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  flex: 1;
  align-content: stretch;
}

.forecast-day {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
}

.forecast-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.day-info {
  margin-bottom: 8px;
}

.day-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #2c3e50;
}

.weather-icon {
  margin: 8px 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-img {
  width: 40px;
  height: 40px;
}

.weather-details {
  margin-top: 8px;
}

.temperature {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
}

.temp-max {
  font-weight: 600;
  color: #e74c3c;
}

.temp-min {
  font-weight: 600;
  color: #3498db;
}

@media (max-width: 768px) {
  .forecast-container {
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }
  
  .forecast-day {
    padding: 12px 8px;
    min-height: 120px;
  }
  
  .weather-img {
    width: 32px;
    height: 32px;
  }
  
  .temperature {
    font-size: 0.8rem;
  }
}
</style> 