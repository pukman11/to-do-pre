import { PRODUCTS_STORAGE_KEY, THEME_STORAGE_KEY } from "../constants.js";

export function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((item) => ({
      id: String(item.id),
      title: String(item.title),
      amount: Number(item.amount),
      category: String(item.category),
      isBought: Boolean(item.isBought),
    }));
  } catch {
    return [];
  }
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

export function loadTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "dark" ? "dark" : "light";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
