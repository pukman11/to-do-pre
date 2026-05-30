export default function ThemeToggle({ theme, onThemeChange }) {
  const isDark = theme === "dark";

  function handleChange(event) {
    onThemeChange(event.target.checked ? "dark" : "light");
  }

  return (
    <label className="theme-toggle" htmlFor="theme-switch">
      <span className="theme-toggle__label">Светлая</span>
      <input
        id="theme-switch"
        className="theme-toggle__input"
        type="checkbox"
        checked={isDark}
        onChange={handleChange}
        aria-label="Переключить тёмную тему"
      />
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__label">Тёмная</span>
    </label>
  );
}
