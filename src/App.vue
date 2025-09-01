<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import SearchBar from '@/components/SearchBar.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import WeatherForecast from '@/components/WeatherForecast.vue'
import WeatherHighlights from '@/components/WeatherHighlights.vue'
import UserProfile from '@/components/UserProfile.vue'

const weatherStore = useWeatherStore()

onMounted(async () => {
  await weatherStore.loadDefaultCityWeather()
})
</script>

<template>
  <div class="app-bg">
    <div class="weather-app-layout">
      <div class="sidebar">
        <SearchBar />
        <CurrentWeather />
      </div>
      <div class="main-content">
        <div class="top-bar">
          <UserProfile />
        </div>
        <div class="main-inner">
          <WeatherForecast />
          <WeatherHighlights />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body, html {
  height: 100%;
  margin: 0;
  font-family: 'Inter', 'Noto Sans TC', sans-serif;
  background: #f3f4f8;
}
.app-bg {
  min-height: 100vh;
  background: #f3f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.weather-app-layout {
  display: flex;
  width: 1200px;
  min-height: 700px;
  background: transparent;
  border-radius: 36px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  overflow: hidden;
  gap: 40px;
}
.sidebar {
  width: 340px;
  background: #fff;
  border-radius: 36px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  min-height: 0;
}
.main-content {
  flex: 1;
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  background: transparent;
  position: relative;
  min-width: 0;
}
.top-bar {
  position: absolute;
  top: 32px;
  right: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
}
.main-inner {
  padding: 80px 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
}
@media (max-width: 1200px) {
  .weather-app-layout {
    width: 100vw;
    min-width: 0;
    border-radius: 0;
    gap: 0;
  }
  .main-inner {
    max-width: 100vw;
    padding: 80px 0 24px 0;
  }
}
@media (max-width: 900px) {
  .weather-app-layout {
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    border-radius: 0;
    gap: 0;
  }
  .sidebar {
    width: 100%;
    border-radius: 0 0 36px 36px;
    flex-direction: row;
    gap: 16px;
    padding: 24px 16px;
    max-height: 220px;
  }
  .main-inner {
    padding: 80px 0 16px 0;
  }
  .main-content {
    padding: 0;
  }
  .top-bar {
    position: static;
    margin-bottom: 16px;
    right: 0;
    top: 0;
  }
}
</style>
