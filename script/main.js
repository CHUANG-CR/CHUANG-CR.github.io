// 取得按鈕元素
const btnDefault = document.getElementById("btn-default");
const btnDark = document.getElementById("btn-dark");

// 切換至預設主題：移除 data-theme 屬性，就會自動退回 :root 的設定
btnDefault.addEventListener("click", () => {
  document.documentElement.removeAttribute("data-theme");
  // 可選：存入瀏覽器快取，下次打開網頁會記住使用者的選擇
  localStorage.setItem("theme", "default");
});

// 切換至深色模式
btnDark.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
});

// 【進階優化】網頁一載入時，先檢查上一次使用者選了什麼主題
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && savedTheme !== "default") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
});
