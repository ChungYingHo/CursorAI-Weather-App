<template>
  <div class="search-bar">
    <input 
      v-model="searchCity"
      type="text" 
      placeholder="搜尋城市..." 
      class="search-input"
      @keyup.enter="handleSearch"
    />
    <button 
      @click="handleSearch"
      class="search-btn"
      :disabled="loading || !searchCity.trim()"
    >
      <span v-if="loading" class="loading-spinner"></span>
      <span v-else>🔍</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const searchCity = computed({
  get: () => weatherStore.searchCity,
  set: (value) => weatherStore.searchCity = value
})

const loading = computed(() => weatherStore.loading)

const handleSearch = () => {
  if (searchCity.value.trim()) {
    weatherStore.searchWeather()
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(245, 246, 250, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
}
.search-btn {
  background: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.search-btn:hover:not(:disabled) {
  background: #f0f0f0;
}
.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>