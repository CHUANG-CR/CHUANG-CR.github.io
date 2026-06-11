// 使用 DOMContentLoaded 確保網頁元素都載入完畢後，才執行程式
document.addEventListener("DOMContentLoaded", () => {


  // ==========================================
  // 3. 熱門城市攻略左右滾動控制功能
  // ==========================================
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const grid = document.querySelector(".city-grid");

  if (prevBtn && nextBtn && grid) {
    prevBtn.addEventListener("click", () => {
      grid.scrollBy({ left: -grid.clientWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      grid.scrollBy({ left: grid.clientWidth, behavior: "smooth" });
    });
  }

  // ==========================================
  // 4. 即時天氣資訊欄：依導覽列選擇與卡片懸停顯示
  // ==========================================
  const weatherData = {
    "台北": { city: "🇹🇼 台北", temp: "26°C", icon: "⛅" },
    "台中": { city: "🇹🇼 台中", temp: "28°C", icon: "☀️" },
    "台南": { city: "🇹🇼 台南", temp: "29°C", icon: "☀️" },
    "東京": { city: "🇯🇵 東京", temp: "20°C", icon: "☀️" },
    "大阪": { city: "🇯🇵 大阪", temp: "22°C", icon: "⛅" },
    "京都": { city: "🇯🇵 京都", temp: "18°C", icon: "☀️" },
    "上海": { city: "🇨🇳 上海", temp: "22°C", icon: "🌧️" },
    "北京": { city: "🇨🇳 北京", temp: "15°C", icon: "💨" },
    "雲南": { city: "🇨🇳 雲南", temp: "19°C", icon: "⛅" }
  };

  const weatherWidget = document.getElementById("weather-widget");

  if (weatherWidget) {
    // 讀取上次選擇的城市，若無則預設為台北
    let activeCity = localStorage.getItem("selected_weather_city") || "台北";
    if (!weatherData[activeCity]) activeCity = "台北";

    // 渲染天氣內容
    const displayWeather = (cityKey) => {
      const current = weatherData[cityKey];
      if (current) {
        weatherWidget.innerHTML = `${current.city} ${current.temp} ${current.icon}`;
      }
    };

    // 初始化載入
    displayWeather(activeCity);
    weatherWidget.style.opacity = 1;

    // 定義綁定天氣互動的函式
    const bindWeatherEvents = (element, matchedCity) => {
      // 滑鼠移入：淡出並顯示預覽城市天氣，隨後淡入
      element.addEventListener("mouseenter", () => {
        weatherWidget.style.opacity = 0;
        setTimeout(() => {
          displayWeather(matchedCity);
          weatherWidget.style.opacity = 1;
        }, 150);
      });

      // 滑鼠移出：還原為目前選取的城市天氣
      element.addEventListener("mouseleave", () => {
        weatherWidget.style.opacity = 0;
        setTimeout(() => {
          displayWeather(activeCity);
          weatherWidget.style.opacity = 1;
        }, 150);
      });

      // 點擊：設為目前選取城市，並記錄在 localStorage 中
      element.addEventListener("click", () => {
        activeCity = matchedCity;
        localStorage.setItem("selected_weather_city", matchedCity);
        displayWeather(matchedCity);
      });
    };

    // 1. 綁定導覽列下拉選單連結
    const navLinks = document.querySelectorAll(".dropdown-content a");
    navLinks.forEach(link => {
      const text = link.innerText;
      let matchedCity = null;
      for (const city in weatherData) {
        if (text.includes(city)) {
          matchedCity = city;
          break;
        }
      }
      if (matchedCity) {
        bindWeatherEvents(link, matchedCity);
      }
    });
  }

  // ==========================================
  // 5. 展開式搜尋欄城市過濾與跳轉功能
  // ==========================================
  const searchInput = document.getElementById("nav-search-input");
  if (searchInput) {
    let hasScrolled = false;
    let debounceTimer;

    // 核心搜尋處理與滾動跳轉邏輯
    const handleSearchInput = (value) => {
      const query = value.toLowerCase().trim();

      // 在輸入至少一個字且此輪搜尋中尚未滾動時，自動平滑滾動至熱門城市區塊
      if (query.length === 0) {
        hasScrolled = false;
      } else if (!hasScrolled) {
        const destinationsSection = document.getElementById("destinations");
        if (destinationsSection) {
          destinationsSection.scrollIntoView({ behavior: "smooth" });
          hasScrolled = true;
        }
      }

      const cityCards = document.querySelectorAll(".city-grid .city-card");
      cityCards.forEach(card => {
        const cityName = card.querySelector("h3").innerText.toLowerCase();
        const countryName = card.getAttribute("data-country") ? card.getAttribute("data-country").toLowerCase() : "";
        if (cityName.includes(query) || countryName.includes(query)) {
          card.style.display = ""; // 恢復顯示
        } else {
          card.style.display = "none"; // 隱藏不符合項目
        }
      });
    };

    // 監聽輸入事件：使用防抖（Debounce）機制，等使用者輸入完畢（暫停打字 700ms）後才執行搜尋與滾動
    // 這適用於注音、拼音、英文字母等各種輸入模式，避免輸入過程中的任何網頁跳動
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleSearchInput(e.target.value);
      }, 700);
    });

    // 支援按下 Enter 鍵立即執行搜尋與滾動，不需等待防抖延遲
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        clearTimeout(debounceTimer);
        handleSearchInput(e.target.value);
      }
    });

    // 支援點擊放大鏡搜尋圖示立即執行搜尋與滾動
    const searchBtn = document.querySelector(".search-btn");
    if (searchBtn) {
      searchBtn.style.cursor = "pointer";
      searchBtn.addEventListener("click", () => {
        clearTimeout(debounceTimer);
        handleSearchInput(searchInput.value);
      });
    }
  }
});
