import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY' // 請在 .env 檔案中設定 VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export interface WeatherData {
  dt: number
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
}

export interface CurrentWeatherResponse {
  coord: {
    lat: number
    lon: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface ForecastResponse {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  daily: Array<{
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: {
      day: number
      min: number
      max: number
      night: number
      eve: number
      morn: number
    }
    feels_like: {
      day: number
      night: number
      eve: number
      morn: number
    }
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    clouds: number
    pop: number
    rain: number
    uvi: number
  }>
}

export class WeatherApiService {
  private static instance: WeatherApiService

  private constructor() {}

  public static getInstance(): WeatherApiService {
    if (!WeatherApiService.instance) {
      WeatherApiService.instance = new WeatherApiService()
    }
    return WeatherApiService.instance
  }

  async getCurrentWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeatherResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  }

  async getForecast(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units
        }
      })
      
      // 轉換 5-day forecast 格式為我們需要的格式
      const dailyData = this.convertForecastToDaily(response.data)
      
      return {
        lat: response.data.city.coord.lat,
        lon: response.data.city.coord.lon,
        timezone: response.data.city.timezone,
        timezone_offset: response.data.city.timezone,
        daily: dailyData
      }
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  }

  private convertForecastToDaily(forecastData: any): any[] {
    const dailyMap = new Map()
    
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000)
      const dateKey = date.toDateString()
      
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, {
          dt: item.dt,
          sunrise: 0, // 5-day forecast 不提供日出日落
          sunset: 0,
          moonrise: 0,
          moonset: 0,
          moon_phase: 0,
          temp: {
            day: item.main.temp,
            min: item.main.temp_min,
            max: item.main.temp_max,
            night: item.main.temp,
            eve: item.main.temp,
            morn: item.main.temp
          },
          feels_like: {
            day: item.main.feels_like,
            night: item.main.feels_like,
            eve: item.main.feels_like,
            morn: item.main.feels_like
          },
          pressure: item.main.pressure,
          humidity: item.main.humidity,
          dew_point: 0,
          wind_speed: item.wind.speed,
          wind_deg: item.wind.deg,
          wind_gust: 0,
          weather: item.weather,
          clouds: item.clouds.all,
          pop: item.pop,
          rain: item.rain ? item.rain['3h'] : 0,
          uvi: 0
        })
      } else {
        // 更新最高最低溫度
        const existing = dailyMap.get(dateKey)
        existing.temp.max = Math.max(existing.temp.max, item.main.temp_max)
        existing.temp.min = Math.min(existing.temp.min, item.main.temp_min)
      }
    })
    
    return Array.from(dailyMap.values()).slice(0, 7) // 只取前 7 天
  }

  async getWeatherByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeatherResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error)
      throw error
    }
  }
}

export default WeatherApiService.getInstance() 