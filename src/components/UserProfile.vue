<template>
  <div class="user-profile">
    <div class="unit-toggle">
      <button 
        :class="['unit-btn', { active: settings.temperatureUnit === 'metric' }]"
        @click="setTemperatureUnit('metric')"
      >
        °C
      </button>
      <button 
        :class="['unit-btn', { active: settings.temperatureUnit === 'imperial' }]"
        @click="setTemperatureUnit('imperial')"
      >
        °F
      </button>
    </div>
    <div class="avatar">
      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const settings = computed(() => weatherStore.settings)

const setTemperatureUnit = (unit: 'metric' | 'imperial') => {
  weatherStore.setTemperatureUnit(unit)
}
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 20px;
}
.unit-toggle {
  display: flex;
  gap: 6px;
  background: #f5f6fa;
  border-radius: 8px;
  padding: 4px 8px;
}
.unit-btn {
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: #888;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.unit-btn.active {
  background: #fff;
  color: #222;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>