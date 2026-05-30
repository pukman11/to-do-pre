export default function ProductItem({
  product,
  isNew,
  isRemoving,
  onToggleBought,
  onDelete,
}) {
  const statusLabel = product.isBought ? "Куплено" : "Не куплено";

  return (
    <li
      className={`product-item${
        product.isBought ? " product-item_bought" : ""
      }${isNew ? " product-item_enter" : ""}${
        isRemoving ? " product-item_exit" : ""
      }`}
    >
      <article className="product-item__card">
        <div className="product-item__main">
          <h3 className="product-item__title">{product.title}</h3>
          <p className="product-item__meta">
            <span className="product-item__amount">
              Количество: <strong>{product.amount}</strong>
            </span>
            <span className="product-item__category">{product.category}</span>
          </p>
          <p
            className={`product-item__status${
              product.isBought ? " product-item__status_bought" : ""
            }`}
          >
            Статус: {statusLabel}
          </p>
        </div>
        <div className="product-item__actions">
          <button
            type="button"
            className={`button button_secondary product-item__toggle${
              product.isBought ? " product-item__toggle_active" : ""
            }`}
            onClick={() => onToggleBought(product.id)}
          >
            {product.isBought ? "Вернуть" : "Куплено"}
          </button>
          <button
            type="button"
            className="button button_danger product-item__delete"
            onClick={() => onDelete(product.id)}
          >
            Удалить
          </button>
        </div>
      </article>
    </li>
  );
}
