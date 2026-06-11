// 使用 DOMContentLoaded 確保網頁元素都載入完畢後，才執行程式
document.addEventListener("DOMContentLoaded", () => {
  // 取得導覽列上的切換按鈕
  const themeToggleBtn = document.getElementById("theme-toggle");

  // ==========================================
  // 1. 網頁一載入時，先檢查 localStorage 記憶
  // ==========================================
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    // 如果之前存的是深色，就幫網頁加上 dark 屬性
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = "淺色模式"; // 已經是深色了，按鈕提示切換回淺色
    }
  } else {
    // 預設為淺色
    document.documentElement.removeAttribute("data-theme");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = "深色模式";
    }
  }

  // ==========================================
  // 2. 點擊按鈕時的切換邏輯
  // ==========================================
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      // 檢查目前的 html 標籤是否有 data-theme="dark"
      const isDarkMode =
        document.documentElement.getAttribute("data-theme") === "dark";

      if (isDarkMode) {
        // 【切換成淺色】
        document.documentElement.removeAttribute("data-theme"); // 移除深色屬性
        themeToggleBtn.textContent = "深色模式"; // 按鈕文字改為深色
        localStorage.setItem("theme", "default"); // 存入記憶
      } else {
        // 【切換成深色】
        document.documentElement.setAttribute("data-theme", "dark"); // 加上深色屬性
        themeToggleBtn.textContent = "淺色模式"; // 按鈕文字改為淺色
        localStorage.setItem("theme", "dark"); // 存入記憶
      }
    });
  }
});
