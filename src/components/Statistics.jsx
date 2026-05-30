export default function Statistics({ total, bought, remaining }) {
  return (
    <section className="statistics" aria-label="Статистика покупок">
      <h2 className="statistics__title">Статистика</h2>
      <ul className="statistics__list">
        <li className="statistics__item">
          <span className="statistics__label">Всего продуктов</span>
          <span className="statistics__value">{total}</span>
        </li>
        <li className="statistics__item statistics__item_type_bought">
          <span className="statistics__label">Куплено</span>
          <span className="statistics__value">{bought}</span>
        </li>
        <li className="statistics__item statistics__item_type_remaining">
          <span className="statistics__label">Осталось купить</span>
          <span className="statistics__value">{remaining}</span>
        </li>
      </ul>
    </section>
  );
}
