import {
  FILTER_ALL,
  FILTER_BOUGHT,
  FILTER_NOT_BOUGHT,
} from "../constants.js";

const FILTERS = [
  { id: FILTER_ALL, label: "Все" },
  { id: FILTER_BOUGHT, label: "Купленные" },
  { id: FILTER_NOT_BOUGHT, label: "Не купленные" },
];

export default function ProductFilters({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <section className="filters" aria-label="Фильтры и поиск">
      <h2 className="filters__title">Фильтры</h2>
      <div className="filters__row">
        <div className="filters__buttons" role="group" aria-label="Фильтр по статусу">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filters__button${
                activeFilter === filter.id ? " filters__button_active" : ""
              }`}
              onClick={() => onFilterChange(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="filters__search">
          <span className="visually-hidden">Поиск по названию</span>
          <input
            className="filters__search-input"
            type="search"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
