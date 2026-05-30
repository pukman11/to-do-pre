import { useMemo, useState } from "react";
import { CATEGORIES } from "../constants.js";
import { validateProductForm } from "../utils/validation.js";

const EMPTY_FORM = {
  title: "",
  amount: "",
  category: "",
};

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});

  const { errors, isValid } = useMemo(
    () => validateProductForm(form),
    [form]
  );

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ title: true, amount: true, category: true });

    if (!isValid) {
      return;
    }

    onAdd({
      title: form.title,
      amount: form.amount,
      category: form.category,
    });
    setForm(EMPTY_FORM);
    setTouched({});
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  return (
    <section className="product-form-section" aria-label="Добавление продукта">
      <h2 className="product-form-section__title">Добавить продукт</h2>
      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <div className="product-form__field">
          <label className="product-form__label" htmlFor="product-title">
            Название
          </label>
          <input
            id="product-title"
            className={`product-form__input${
              showError("title") ? " product-form__input_invalid" : ""
            }`}
            type="text"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
            placeholder="Например, молоко"
          />
          {showError("title") && (
            <p className="product-form__error" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className="product-form__field">
          <label className="product-form__label" htmlFor="product-amount">
            Количество
          </label>
          <input
            id="product-amount"
            className={`product-form__input${
              showError("amount") ? " product-form__input_invalid" : ""
            }`}
            type="number"
            min="1"
            step="1"
            value={form.amount}
            onChange={(event) => updateField("amount", event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
            placeholder="1"
          />
          {showError("amount") && (
            <p className="product-form__error" role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="product-form__field">
          <label className="product-form__label" htmlFor="product-category">
            Категория
          </label>
          <select
            id="product-category"
            className={`product-form__select${
              showError("category") ? " product-form__input_invalid" : ""
            }`}
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, category: true }))}
          >
            <option value="">Выберите категорию</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {showError("category") && (
            <p className="product-form__error" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <button
          className="button button_primary product-form__submit"
          type="submit"
          disabled={!isValid}
        >
          Добавить
        </button>
      </form>
    </section>
  );
}
