<template>
  <div class="weather-settings">
    <h3 class="settings-title">設定</h3>
    
    <div class="settings-container">
      <!-- Temperature Unit Setting -->
      <div class="setting-group">
        <label class="setting-label">溫度單位</label>
        <div class="unit-toggle">
          <button 
            :class="['unit-btn', { active: settings.temperatureUnit === 'metric' }]"
            @click="setTemperatureUnit('metric')"
          >
            攝氏 (°C)
          </button>
          <button 
            :class="['unit-btn', { active: settings.temperatureUnit === 'imperial' }]"
            @click="setTemperatureUnit('imperial')"
          >
            華氏 (°F)
          </button>
        </div>
      </div>
      
      <!-- Default City Setting -->
      <div class="setting-group">
        <label class="setting-label">預設城市</label>
        <div class="default-city-input">
          <input 
            v-model="newDefaultCity"
            type="text"
            placeholder="輸入城市名稱 (例如: Tainan,TW)"
            class="city-input"
            @keyup.enter="setDefaultCity"
          />
          <button 
            @click="setDefaultCity"
            class="set-btn"
            :disabled="!newDefaultCity.trim()"
          >
            設定
          </button>
        </div>
        <div class="current-default">
          目前預設: <strong>{{ settings.defaultCity }}</strong>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="setting-group">
        <label class="setting-label">快速操作</label>
        <div class="quick-actions">
          <button 
            @click="loadDefaultCity"
            class="action-btn"
            :disabled="loading"
          >
            {{ loading ? '載入中...' : '載入預設城市' }}
          </button>
          <button 
            @click="clearSettings"
            class="action-btn clear"
          >
            清除設定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

const newDefaultCity = ref('')
const loading = computed(() => weatherStore.loading)

const settings = computed(() => weatherStore.settings)

const setTemperatureUnit = (unit: 'metric' | 'imperial') => {
  weatherStore.setTemperatureUnit(unit)
}

const setDefaultCity = () => {
  if (newDefaultCity.value.trim()) {
    weatherStore.setDefaultCity(newDefaultCity.value.trim())
    newDefaultCity.value = ''
  }
}

const loadDefaultCity = async () => {
  await weatherStore.loadDefaultCityWeather()
}

const clearSettings = () => {
  if (confirm('確定要清除所有設定嗎？')) {
    localStorage.removeItem('weather-settings')
    location.reload()
  }
}
</script>

<style scoped>
.weather-settings {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.settings-title {
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.settings-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.unit-toggle {
  display: flex;
  gap: 8px;
}

.unit-btn {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.unit-btn:hover {
  border-color: #007bff;
}

.unit-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.default-city-input {
  display: flex;
  gap: 8px;
}

.city-input {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.city-input:focus {
  outline: none;
  border-color: #007bff;
}

.set-btn {
  padding: 10px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.set-btn:hover:not(:disabled) {
  background: #218838;
}

.set-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.current-default {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 4px;
}

.quick-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  border-color: #007bff;
  background: #f8f9fa;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.clear {
  border-color: #dc3545;
  color: #dc3545;
}

.action-btn.clear:hover {
  background: #dc3545;
  color: white;
}

@media (max-width: 768px) {
  .default-city-input {
    flex-direction: column;
  }
  
  .quick-actions {
    flex-direction: column;
  }
}
</style> 