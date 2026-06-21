# 🌍 亞洲旅遊指南 (Asian Travel Guide)

**亞洲旅遊指南**是一個專為亞洲各大城市自由行設計的靜態導覽網站。提供最完整的交通指南、必吃美食、高CP值住宿與行前清單，並內建實用的旅遊小工具，協助旅客輕鬆規劃完美旅程。

目前網站已上線「**東京篇**」，並提供「**即時匯率轉換器**」與「**互動行前打包清單**」等實用工具。

🔗 **網站預覽：** [https://chuang-cr.github.io/](https://chuang-cr.github.io/)

---

## ✨ 核心功能 (Key Features)

* **🌆 城市導覽攻略**：提供熱門城市的深度導覽（目前主推日本東京），包含住宿推薦、交通票券全攻略、景點介紹、美食清單與購物指南。
* **🛠️ 實用線上工具**：
    * **💵 即時匯率轉換器**：串接開源 API (ExchangeRate-API)，提供即時的各國貨幣匯率換算。
    * **✅ 互動行前打包清單**：將必備物品分類為「隨身物品」與「托運行李」，支援勾選互動，並透過 `localStorage` 自動儲存打包進度。
* **🌦️ 即時天氣預覽**：導覽列內建天氣小工具，可根據選取的城市動態切換並顯示當地氣溫。
* **🔍 快速搜尋過濾**：首頁提供搜尋列，採用防抖 (Debounce) 技術，支援即時過濾城市卡片，並平滑滾動至結果區。
* **📱 響應式網頁設計 (RWD)**：全站支援行動裝置、平板與桌機，確保各種螢幕尺寸下皆能提供最佳的閱讀體驗。

---

## 📂 網站架構 (Site Structure)

* `index.html`：**網站首頁** - 包含 Hero 主視覺、亞洲各國熱門城市卡片（支援橫向滑動與搜尋）、實用工具入口。
* `page/tokyo.html`：**東京自由行攻略** - 詳細整理東京的飯店、地鐵交通、景點、美食、購物及行前準備。
* `page/shanghai.html`：**上海篇** - (建置中)
* `page/exchange.html`：**即時匯率換算** - 提供 TWD、USD、JPY、EUR、KRW 的即時換算。
* `page/checklist.html`：**互動行前清單** - 動態打包進度表。
* `assets/`：存放專案的靜態資源
    * `css/`：包含全站共用樣式 (`index.css`) 與東京篇專用樣式 (`tokyo.css`)。
    * `js/`：`main.js` 處理搜尋、天氣預覽與首頁互動邏輯。
    * `images/`：存放網站的圖片及 Favicon。

---

## 💻 使用技術 (Tech Stack)

* **前端結構**：HTML5 (語意化標籤)
* **樣式設計**：CSS3
    * 使用 CSS Variables 進行主題色管理（冷色調、深藏青色系為主）。
    * Flexbox & CSS Grid 彈性排版。
    * Media Queries 實現 RWD 響應式佈局。
    * 客製化捲軸 (Scrollbar) 與毛玻璃 (Backdrop-filter) 視覺效果。
* **互動邏輯**：Vanilla JavaScript (ES6)
    * DOM 操作與事件監聽。
    * 非同步請求 (`fetch` / `async & await`) 抓取即時匯率 API。
    * `localStorage` 實現資料持久化儲存 (行前清單進度與天氣城市選擇)。

---

## 📜 版權聲明 (Credits)

* 本網站為網頁設計專案練習作品。
* 網站內容與文字版權歸屬原作者：`© 2026/10/23，去別人覺得無聊的地方看看吧。將嚮往的遠方，變成走過的地方。`
* 圖片及 Icon 來源：
    * 首頁背景：[fuji-mountain.jpg](https://reurl.cc/bdp7Q3)
    * Favicon 圖示：[Avocado Emoji](https://favicon.io/emoji-favicons/avocado)
* 匯率資料來源：[ExchangeRate-API](https://www.exchangerate-api.com/)
""")
print("README.md created.")
