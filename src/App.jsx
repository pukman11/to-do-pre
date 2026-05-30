import { useEffect, useMemo, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ProductFilters from "./components/ProductFilters.jsx";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import Statistics from "./components/Statistics.jsx";
import { FILTER_ALL } from "./constants.js";
import { createProduct, filterProducts, getStatistics } from "./utils/product.js";
import {
  loadProducts,
  loadTheme,
  saveProducts,
  saveTheme,
} from "./utils/storage.js";

const DELETE_ANIMATION_MS = 280;
const NEW_PRODUCT_HIGHLIGHT_MS = 600;

export default function App() {
  const [products, setProducts] = useState(loadProducts);
  const [theme, setTheme] = useState(loadTheme);
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProductId, setNewProductId] = useState(null);
  const [removingIds, setRemovingIds] = useState(() => new Set());

  const filteredProducts = useMemo(
    () => filterProducts(products, activeFilter, searchQuery),
    [products, activeFilter, searchQuery]
  );

  const statistics = useMemo(() => getStatistics(products), [products]);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!newProductId) {
      return undefined;
    }
    const timer = setTimeout(() => setNewProductId(null), NEW_PRODUCT_HIGHLIGHT_MS);
    return () => clearTimeout(timer);
  }, [newProductId]);

  function handleAddProduct(formData) {
    const product = createProduct(formData);
    setProducts((prev) => [product, ...prev]);
    setNewProductId(product.id);
  }

  function handleToggleBought(productId) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isBought: !product.isBought }
          : product
      )
    );
  }

  function handleDeleteProduct(productId) {
    setRemovingIds((prev) => new Set(prev).add(productId));

    setTimeout(() => {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, DELETE_ANIMATION_MS);
  }

  return (
    <div className="app">
      <Header theme={theme} onThemeChange={setTheme} />
      <main className="main">
        <div className="layout">
          <aside className="layout__sidebar">
            <Statistics
              total={statistics.total}
              bought={statistics.bought}
              remaining={statistics.remaining}
            />
            <ProductForm onAdd={handleAddProduct} />
          </aside>
          <div className="layout__content">
            <ProductFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <ProductList
              products={filteredProducts}
              allProductsCount={products.length}
              newProductId={newProductId}
              removingIds={removingIds}
              onToggleBought={handleToggleBought}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
