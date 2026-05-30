export function createProduct({ title, amount, category }) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    amount: Number(amount),
    category,
    isBought: false,
  };
}

export function filterProducts(products, filter, searchQuery) {
  let result = products;

  if (filter === "bought") {
    result = result.filter((product) => product.isBought);
  } else if (filter === "notBought") {
    result = result.filter((product) => !product.isBought);
  }

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    result = result.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }

  return result;
}

export function getStatistics(products) {
  const total = products.length;
  const bought = products.filter((product) => product.isBought).length;
  return {
    total,
    bought,
    remaining: total - bought,
  };
}
