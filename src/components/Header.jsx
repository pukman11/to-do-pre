import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ theme, onThemeChange }) {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">Список продуктов</h1>
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
      </div>
    </header>
  );
}
