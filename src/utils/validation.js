export function validateProductForm({ title, amount, category }) {
  const errors = {};
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    errors.title = "Введите название продукта";
  } else if (trimmedTitle.length < 2) {
    errors.title = "Название должно быть не короче 2 символов";
  }

  if (amount === "" || amount === null || amount === undefined) {
    errors.amount = "Укажите количество";
  } else if (Number(amount) <= 0) {
    errors.amount = "Количество должно быть больше 0";
  }

  if (!category) {
    errors.category = "Выберите категорию";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
