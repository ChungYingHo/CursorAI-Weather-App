# 🌤️ 天氣應用程式

一個使用 Vue 3 + TypeScript 建立的現代化天氣應用程式，提供即時天氣資訊和 7 天預報。

## ✨ 功能特色

- **即時天氣顯示**: 顯示當前溫度、體感溫度、濕度、風速等詳細資訊
- **城市搜尋**: 支援手動輸入城市名稱搜尋天氣
- **7 天預報**: 顯示未來 7 天的詳細天氣預報
- **溫度單位切換**: 支援攝氏 (°C) 和華氏 (°F) 溫度單位
- **預設城市設定**: 可設定預設城市，應用程式啟動時自動載入
- **天氣地圖**: 使用 Leaflet 顯示當前天氣的地理位置
- **響應式設計**: 完美支援桌面和行動裝置
- **本地儲存**: 設定會自動儲存到瀏覽器本地儲存

## 🚀 快速開始

### 前置需求

- Node.js 20.19.0 或更高版本
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **設定 API 金鑰**
   
   複製環境變數範例檔案並設定您的 API 金鑰：
   ```bash
   cp env.example .env
   ```
   
   然後編輯 `.env` 檔案，將 `your_api_key_here` 替換為您的 OpenWeatherMap API 金鑰：
   ```env
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```
   
   > **注意**: 您需要註冊 [OpenWeatherMap](https://openweathermap.org/api) 帳號來獲取免費的 API 金鑰

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

5. **開啟瀏覽器**
   
   前往 `http://localhost:5173` 查看應用程式

## 📱 使用說明

### 基本操作

1. **搜尋城市**: 在搜尋欄位輸入城市名稱（例如：`Tainan,TW`、`Taipei,TW`、`Tokyo,JP`）
2. **查看天氣**: 應用程式會顯示當前天氣資訊，包括溫度、濕度、風速等
3. **切換溫度單位**: 在設定區域點擊「攝氏」或「華氏」按鈕
4. **設定預設城市**: 在設定區域輸入城市名稱並點擊「設定」

### 功能區域

- **當前天氣**: 顯示搜尋城市的即時天氣資訊
- **天氣地圖**: 顯示當前城市的地理位置和天氣狀況
- **7 天預報**: 顯示未來 7 天的詳細天氣預報
- **設定**: 管理溫度單位和預設城市設定

## 🛠️ 技術架構

### 前端技術

- **Vue 3**: 使用 Composition API 和 TypeScript
- **Pinia**: 狀態管理
- **Vue Router**: 路由管理
- **Axios**: HTTP 客戶端
- **Leaflet**: 地圖顯示
- **Vite**: 建置工具

### 專案結構

```
src/
├── components/          # Vue 組件
│   ├── CurrentWeather.vue
│   ├── WeatherForecast.vue
│   ├── WeatherMap.vue
│   └── WeatherSettings.vue
├── services/           # API 服務
│   └── weatherApi.ts
├── stores/            # Pinia stores
│   └── weather.ts
├── router/            # 路由配置
│   └── index.ts
├── App.vue           # 主應用程式組件
└── main.ts           # 應用程式入口
```

## 🔧 開發指令

```bash
# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview

# 執行測試
npm run test:unit

# 程式碼檢查
npm run lint
```

## 📊 API 整合

本應用程式使用 OpenWeatherMap API 提供天氣資料：

- **當前天氣**: `GET /weather`
- **7 天預報**: `GET /onecall`
- **天氣地圖**: OpenWeatherMap 地圖圖層

### API 限制

- 免費帳號：每分鐘 60 次請求
- 付費帳號：根據方案提供更高限制

## 🎨 設計特色

- **現代化 UI**: 使用漸層背景和毛玻璃效果
- **響應式設計**: 完美適配各種螢幕尺寸
- **直觀操作**: 簡潔明瞭的使用者介面
- **即時回饋**: 載入動畫和錯誤提示

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

- [OpenWeatherMap](https://openweathermap.org/) - 提供天氣 API
- [Vue.js](https://vuejs.org/) - 前端框架
- [Leaflet](https://leafletjs.com/) - 地圖庫
