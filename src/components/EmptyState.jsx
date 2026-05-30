export default function EmptyState({ hasProducts, hasVisibleProducts }) {
  if (!hasProducts) {
    return (
      <p className="empty-state empty-state_animate" role="status">
        Список пуст. Добавьте первый продукт в форму выше.
      </p>
    );
  }

  if (!hasVisibleProducts) {
    return (
      <p className="empty-state empty-state_animate" role="status">
        По вашему запросу ничего не найдено. Измените фильтр или поиск.
      </p>
    );
  }

  return null;
}
