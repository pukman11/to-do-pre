import EmptyState from "./EmptyState.jsx";
import ProductItem from "./ProductItem.jsx";

export default function ProductList({
  products,
  allProductsCount,
  newProductId,
  removingIds,
  onToggleBought,
  onDelete,
}) {
  const hasProducts = allProductsCount > 0;
  const hasVisibleProducts = products.length > 0;

  return (
    <section className="product-list-section" aria-label="Список продуктов">
      <h2 className="product-list-section__title">Ваши продукты</h2>
      <EmptyState
        hasProducts={hasProducts}
        hasVisibleProducts={hasVisibleProducts}
      />
      {hasVisibleProducts && (
        <ul className="product-list">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isNew={product.id === newProductId}
              isRemoving={removingIds.has(product.id)}
              onToggleBought={onToggleBought}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
