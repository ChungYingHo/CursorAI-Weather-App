import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import weatherApi from '@/services/weatherApi'
import type { CurrentWeatherResponse, ForecastResponse } from '@/services/weatherApi'

export interface WeatherSettings {
  defaultCity: string
  temperatureUnit: 'metric' | 'imperial'
}

export const useWeatherStore = defineStore('weather', () => {
  // State
  const currentWeather = ref<CurrentWeatherResponse | null>(null)
  const forecast = ref<ForecastResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchCity = ref('')
  
  // Settings
  const settings = ref<WeatherSettings>({
    defaultCity: 'Tainan,TW',
    temperatureUnit: 'metric'
  })

  // Load settings from localStorage
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('weather-settings')
    if (savedSettings) {
      settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
    }
  }

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('weather-settings', JSON.stringify(settings.value))
  }

  // Computed
  const temperatureSymbol = computed(() => {
    return settings.value.temperatureUnit === 'metric' ? '°C' : '°F'
  })

  const windSpeedUnit = computed(() => {
    return settings.value.temperatureUnit === 'metric' ? 'm/s' : 'mph'
  })

  // Actions
  const fetchCurrentWeather = async (city: string) => {
    loading.value = true
    error.value = null
    
    try {
      const weather = await weatherApi.getCurrentWeather(city, settings.value.temperatureUnit)
      currentWeather.value = weather
      
      // Fetch forecast if we have coordinates
      if (weather.coord) {
        await fetchForecast(weather.coord.lat, weather.coord.lon)
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || '無法獲取天氣資料'
      console.error('Error fetching weather:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const forecastData = await weatherApi.getForecast(lat, lon, settings.value.temperatureUnit)
      forecast.value = forecastData
    } catch (err: any) {
      console.error('Error fetching forecast:', err)
    }
  }

  const searchWeather = async () => {
    if (searchCity.value.trim()) {
      await fetchCurrentWeather(searchCity.value.trim())
    }
  }

  const setDefaultCity = (city: string) => {
    settings.value.defaultCity = city
    saveSettings()
  }

  const setTemperatureUnit = (unit: 'metric' | 'imperial') => {
    settings.value.temperatureUnit = unit
    saveSettings()
    
    // Refetch current weather with new unit if we have weather data
    if (currentWeather.value) {
      fetchCurrentWeather(currentWeather.value.name)
    }
  }

  const loadDefaultCityWeather = async () => {
    if (settings.value.defaultCity) {
      await fetchCurrentWeather(settings.value.defaultCity)
    }
  }

  // Initialize
  loadSettings()

  return {
    // State
    currentWeather,
    forecast,
    loading,
    error,
    searchCity,
    settings,
    
    // Computed
    temperatureSymbol,
    windSpeedUnit,
    
    // Actions
    fetchCurrentWeather,
    fetchForecast,
    searchWeather,
    setDefaultCity,
    setTemperatureUnit,
    loadDefaultCityWeather
  }
}) 